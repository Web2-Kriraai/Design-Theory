import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const { pathname } = req.nextUrl;
        const { token } = req.nextauth;

        // 1. Protect /dashboard — redirect to /auth if not authenticated admin
        if (pathname.startsWith("/dashboard") && token?.role !== "admin") {
            return NextResponse.redirect(new URL("/auth", req.url));
        }

        // 2. Protect sensitive API routes — return 401 if not admin
        // Note: GET/DELETE/PATCH are protected; POST /api/enquiries and POST /api/subscribe should be public.
        const isAdminAPI = pathname.startsWith("/api/newsletter") ||
            pathname.startsWith("/api/dashboard") ||
            pathname.startsWith("/api/users") ||
            (pathname.startsWith("/api/enquiries") && req.method !== "POST");

        if (isAdminAPI && token?.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                const { pathname } = req.nextUrl;
                const { method } = req;

                // /auth is always public
                if (pathname === "/auth") return true;

                // Public API routes
                if (pathname === "/api/subscribe" && method === "POST") return true;
                if (pathname === "/api/enquiries" && method === "POST") return true;

                // All other protected routes require a token
                return !!token;
            },
        },
    }
);

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/api/enquiries/:path*",
        "/api/newsletter/:path*",
        "/api/dashboard/:path*",
        "/api/users/:path*",
        "/api/subscribe"
    ],
};
