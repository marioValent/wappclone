import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const chatId = searchParams.get("chatId");

        if (!chatId)
            return NextResponse.json({
                message: "Please provide a chat id",
                chat: null,
            });

        const foundChat = await db.chat.findUnique({
            where: {
                id: chatId,
            },
            include: {
                messages: true,
            },
        });

        if (!foundChat) {
            return NextResponse.json({
                message: "Chat not found",
                chat: null,
            });
        }

        return NextResponse.json({
            message: "Chat found",
            chat: foundChat,
        });
    } catch (err) {
        return NextResponse.json({
            message: "Chat not found",
            chat: null,
        });
    }
}
