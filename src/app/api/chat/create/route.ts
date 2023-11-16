import db from "@/lib/db";
import { verifyJWT } from "@/lib/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const userId = verifyJWT(body.token);

        const createdChat = await db.chat.create({
            data: {
                userId: userId,
                friendId: body.friendId,
            },
            include: {
                messages: true,
                user: true,
                friend: true,
            },
        });

        return NextResponse.json({
            message: "Chat created",
            chat: createdChat,
        });
    } catch (err) {
        console.log("err", err);
        return NextResponse.json({
            message: "Chat not created",
            chat: null,
        });
    }
}
