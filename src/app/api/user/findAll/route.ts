import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "@/lib/jwt";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const token = body.token;
        const id = verifyJWT(token);

        const users = await db.user.findMany({
            orderBy: [{ firstName: "asc" }, { lastName: "asc" }],
            include: {
                chat: {
                    where: {
                        OR: [
                            {
                                userId: id,
                            },
                            {
                                friendId: id,
                            },
                        ],
                    },
                    include: { messages: true },
                },
            },
        });

        return NextResponse.json({
            message: "Users found",
            users: users,
        });
    } catch (err) {
        return NextResponse.json({
            message: "No users",
            users: [],
        });
    }
}
