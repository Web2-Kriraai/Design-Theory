import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const { pathname } = req.nextUrl;
        const { token } = req.nextauth;

        // Protect /dashboard — redirect to /auth if not authenticated admin
        if (pathname.startsWith("/dashboard") && token?.role !== "admin") {
            return NextResponse.redirect(new URL("/auth", req.url));
        }
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                const { pathname } = req.nextUrl;
                // /auth is always public
                if (pathname === "/auth") return true;
                // Protected routes require a token
                return !!token;
            },
        },
    }
);

export const config = {
    matcher: ["/dashboard/:path*", "/api/enquiries/:path*", "/api/newsletter/:path*", "/api/dashboard/:path*", "/api/users/:path*"],
};
