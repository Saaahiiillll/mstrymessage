// import dbConnect from "@/lib/dbConnect";
// import UserModel from "@/model/User";
// import { z } from 'zod';
// import { usernameValidation } from "@/schemas/signUpSchema";

// const UsernameQuerySchema = z.object({
//     username: usernameValidation
// })

// export async function GET(request: Request) {

//     await dbConnect()

//     try {
//         const { searchParams } = new URL(request.url)
//         const queryParam = {
//             username: searchParams.get('username')
//         }
//         //validate with zod
//         const result = UsernameQuerySchema.safeParse(queryParam)
//         console.log(result) //TODO: remove

//         if (!result.success) {
//             const usernameErrors = result.error.format().username?._errors || [];
//             return Response.json({
//                 success: false,
//                 message: usernameErrors?.length > 0
//                     ? usernameErrors.join(", ")
//                     : 'Invalid query parameters',
//             }, { status: 400 })
//         }
//         const { username } = result.data
//         const existingVerifiedUser = await UserModel.findOne({
//             username,
//             isVerified: true
//         })

//         if (existingVerifiedUser) {
//             return Response.json({
//                 success: false,
//                 message: 'Username is already taken',
//             }, { status: 200 })
//         }
//         return Response.json({
//             success: true,
//             message: 'Username is available',
//         }, { status: 200 })

//     } catch (error) {
//         console.error("Error Checking username", error)
//         return Response.json(
//             {
//                 success: false,
//                 message: "Error checking username"
//             },
//             { status: 500 })

//     }
// }
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",

            credentials: {
                identifier: {
                    label: "Username or Email",
                    type: "text",
                },
                password: {
                    label: "Password",
                    type: "password",
                },
            },

            async authorize(credentials) {
                await dbConnect();

                if (!credentials?.identifier || !credentials?.password) {
                    throw new Error("Missing credentials");
                }

                const user = await UserModel.findOne({
                    $or: [
                        { username: credentials.identifier },
                        { email: credentials.identifier },
                    ],
                });

                if (!user) {
                    throw new Error("User not found");
                }

                const isPasswordCorrect = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (!isPasswordCorrect) {
                    throw new Error("Invalid password");
                }

                return {
                    id: user._id.toString(),
                    username: user.username,
                    email: user.email,
                    isVerified: user.isVerified,
                    isAcceptingMessages: user.isAcceptingMessages,
                };
            },
        }),
    ],

    session: {
        strategy: "jwt",
    },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token._id = user.id;
                token.username = user.username;
                token.isVerified = user.isVerified;
                token.isAcceptingMessages = user.isAcceptingMessages;
            }

            return token;
        },

        async session({ session, token }) {
            if (token) {
                session.user._id = token._id;
                session.user.username = token.username;
                session.user.isVerified = token.isVerified;
                session.user.isAcceptingMessages =
                    token.isAcceptingMessages;
            }

            return session;
        },
    },

    secret: process.env.NEXTAUTH_SECRET,
};
