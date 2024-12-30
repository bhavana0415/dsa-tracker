// import { withAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";

// export default withAuth(
//     async function middleware(req) {
//         const { pathname } = req.nextUrl;

//         // Check if the user is logged in (token presence)
//         const token = req.cookies.get("next-auth.session-token") || req.cookies.get("__Secure-next-auth.session-token");
//         // console.log("tokennnnnn", token)

//         // Pages that should redirect to "/" if the user is logged in
//         const isAuthPage = ["/login", "/register"].includes(pathname);
//         console.log("tokennnnnn", isAuthPage)

//         if (token && isAuthPage) {
//             return NextResponse.redirect(new URL("/", req.url));
//         }

//         // Allow middleware to continue processing for other routes
//         return NextResponse.next();
//     },
//     {
//         pages: {
//             signIn: "/login", // Default sign-in page
//         },
//     }
// );

// export const config = {
//     matcher: ["/((?!login|register).*)"],
// };


import { withAuth } from "next-auth/middleware";

export default withAuth(
    {
        pages: {
            signIn: "/login",
        },
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
);

export const config = {
    matcher: ["/((?!login|register).*)"],
};
