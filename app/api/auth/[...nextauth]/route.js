import NextAuth from "next-auth";
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
                console.log("Authorize attempt for:", credentials?.email);
                if (!credentials?.email || !credentials?.password) {
                    console.log("Missing email or password");
                    throw new Error("Email and password required");
                }

                await connectDB();

                // Find user by email and include password
                const user = await User.findOne({ email: credentials.email }).select("+password");

                if (!user) {
                    console.log("No user found with email:", credentials.email);
                    throw new Error("No user found with this email");
                }

                const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

                if (!isPasswordCorrect) {
                    console.log("Incorrect password for:", credentials.email);
                    throw new Error("Invalid password");
                }

                console.log("Authorize successful for:", credentials.email, "role:", user.role);
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

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

