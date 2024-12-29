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
                        name: user.firstname + " " + user.lastname,
                        email: user.email,
                        phone: user.phone,
                        website: user.website,
                        role: user.role || "user",
                        location: user.location,
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
                token.name = user.name;
                token.email = user.email;
                token.phone = user.phone;
                token.website = user.website;
                token.role = user.role;
                token.location = user.location;
            }
            return token;
        },
        // Pass user details from JWT to session
        async session({ session, token }) {
            session.id = token.id;
            session.user.name = token.name;
            session.user.email = token.email;
            session.user.phone = token.phone;
            session.user.website = token.website;
            session.user.role = token.role;
            session.user.location = token.location;
            return session;
        },
    },
    pages: {
        signIn: "/login", // Custom login page
    },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
