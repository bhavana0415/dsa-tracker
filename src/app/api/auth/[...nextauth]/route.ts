import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongoDB from "../../../../lib/mongodb";
import User from "../../../../../models/user";
import bcrypt from "bcrypt";

export const authOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials) {
                    throw new Error("Credentials not provided.");
                }
                await connectMongoDB();
                try {
                    // Find user by email
                    const user = await User.findOne({ email: credentials.email });
                    if (!user) {
                        throw new Error("No user found with this email.");
                    }

                    // Compare password
                    const isPasswordValid = await bcrypt.compare(
                        credentials.password,
                        user.password
                    );

                    if (!isPasswordValid) {
                        throw new Error("Invalid credentials.");
                    }

                    // Return additional user details
                    return {
                        id: user._id.toString(),
                        email: user.email,
                    };
                } catch (error) {
                    console.log("Authorize error:", error);
                    throw new Error("Authentication failed.");
                }
            },
        }),
    ],
    callbacks: {
        // Store user details in JWT
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
            }
            return token;
        },
        // Pass user details from JWT to session
        async session({ session, token }) {
            session.id = token.id;
            session.user.email = token.email;
            return session;
        },
    },
    pages: {
        signIn: "/login", // Custom login page
    },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
