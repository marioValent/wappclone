import db from "@/lib/db";
import { verifyJWT } from "@/lib/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const userId = verifyJWT(body.token);

        const chats = await db.chat.findMany({
            where: {
                OR: [
                    {
                        userId: userId,
                    },
                    {
                        friendId: userId,
                    },
                ],
            },
            include: {
                messages: {
                    orderBy: {
                        createdAt: "desc",
                    },
                },
                friend: true,
                user: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json({
            message: "Chats found",
            chats: chats,
        });
    } catch (err) {
        return NextResponse.json({
            message: "No chats",
            chats: null,
        });
    }
}
