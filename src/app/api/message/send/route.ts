import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const newMessage = await db.message.create({
            data: {
                senderId: body.senderId,
                receiverId: body.receiverId,
                text: body.text,
                chatId: body.chatId,
            },
        });

        return NextResponse.json({
            message: "Message sent",
            data: newMessage,
        });
    } catch (err) {
        return NextResponse.json({
            message: "Message not sent",
            data: null,
        });
    }
}
