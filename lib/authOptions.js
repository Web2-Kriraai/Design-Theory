import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const email = credentials?.email?.toLowerCase().trim();
                const password = credentials?.password;

                console.log("Authorize attempt for:", email);

                if (!email || !password) {
                    console.log("Authorize failed: Missing email or password");
                    throw new Error("Email and password required");
                }

                await connectDB();

                // Find user by email and include password
                const user = await User.findOne({ email }).select("+password");

                if (!user) {
                    console.log("Authorize failed: No user found with email:", email);
                    throw new Error("No user found with this email");
                }

                const isPasswordCorrect = await bcrypt.compare(password, user.password);

                if (!isPasswordCorrect) {
                    console.log("Authorize failed: Incorrect password for:", email);
                    throw new Error("Invalid password");
                }

                console.log("Authorize successful for:", email, "role:", user.role);
                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    role: user.role,
                };
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        }
    },
    pages: {
        signIn: "/auth",
    },
    session: {
        strategy: "jwt",
    },
    // Required for Vercel deployment — trusts the host forwarded by Vercel's proxy
    trustHost: true,
    secret: process.env.NEXTAUTH_SECRET,
};
