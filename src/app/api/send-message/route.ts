import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

import { Message } from "@/model/User";

export async function POST(request: Request) {
    await dbConnect()

    const { username, content } = await request.json()
    try {
        const user = await UserModel.findOne({ username }).exec();
        if (!user) {
            return Response.json(
                {
                    success: false,
                    message: "User not found"
                },
                { status: 404 }
            )
        }
        //check if user accepting the message
        if (!user.isAcceptingMessages) {
            return Response.json(
                {
                    success: false,
                    message: "User is not accepting the messages "
                },
                { status: 403 }
            )
        }
        const newMessage = { content, createdAt: new Date() }
        //Push the new message to the user's message array
        user.messages.push(newMessage as Message)
        await user.save()

        return Response.json(
            {
                success: true,
                message: "Message sent successfully"
            }, { status: 201 }
        )
    } catch (error) {
        console.log("Error adding messsages", error)
        return Response.json(
            {
                success: false,
                message: "Internal server error"
            },
            { status: 500 }
        )
    }
}