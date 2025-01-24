import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongoDB from "../../../../lib/mongodb";
import User from "../../../../../models/user";
import bcrypt from "bcrypt";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            email: string;
            avatar: string;
        };
    }
    interface JWT {
        id: string;
        email: string;
        avatar: string;
    }
    interface User {
        id: string;
        email: string;
        avatar: string;
    }
}

const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Enter your email" },
                password: { label: "Password", type: "password", placeholder: "Enter your password" },
            },
            async authorize(credentials) {
                if (!credentials || !credentials.email || !credentials.password) {
                    throw new Error("Email and password are required.");
                }

                await connectMongoDB();

                try {
                    const user = await User.findOne({ email: credentials.email });
                    if (!user) {
                        throw new Error("No user found with this email.");
                    }

                    const isPasswordValid = await bcrypt.compare(
                        credentials.password,
                        user.password
                    );

                    if (!isPasswordValid) {
                        throw new Error("Invalid credentials.");
                    }

                    return {
                        id: user._id.toString(),
                        email: user.email,
                        avatar: user.avatar,
                    };
                } catch (error) {
                    console.log("Authorization error:", error);
                    throw new Error("Authentication failed.");
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.avatar = user.avatar;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = {
                id: token.id ? String(token.id) : "",
                email: token.email || "",
                avatar: token.avatar ? String(token.avatar) : "",
            };
            return session;
        },
    },

    pages: {
        signIn: "/login",
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
