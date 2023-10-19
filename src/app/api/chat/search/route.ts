import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get("query");

        if (!query) {
            return NextResponse.json({
                message: "Please provide a query",
                chats: null,
                users: null,
            });
        }

        const chats = await db.chat.findMany({
            where: {
                OR: [
                    {
                        friend: {
                            OR: [
                                {
                                    firstName: {
                                        contains: query,
                                        mode: "insensitive",
                                    },
                                },
                                {
                                    lastName: {
                                        contains: query,
                                        mode: "insensitive",
                                    },
                                },
                            ],
                        },
                    },
                    {
                        messages: {
                            some: {
                                text: {
                                    contains: query,
                                    mode: "insensitive",
                                },
                            },
                        },
                    },
                ],
            },
            include: {
                messages: true,
                friend: true,
            },
        });

        const users = await db.user.findMany({
            where: {
                OR: [
                    {
                        firstName: {
                            contains: query,
                            mode: "insensitive",
                        },
                    },
                    {
                        lastName: {
                            contains: query,
                            mode: "insensitive",
                        },
                    },
                ],
            },
            include: {
                chat: true,
            },
        });

        const chatUsersIds = chats.map((chat) => chat.friendId);
        const usersNotInChats = users.filter(
            (user) => !chatUsersIds.includes(user.id)
        );

        return NextResponse.json({
            message: "Chats found",
            chats: chats,
            users: usersNotInChats,
        });
    } catch (err) {
        console.log("err", err);
        return NextResponse.json({
            message: "Chats not found",
            chats: null,
            users: null,
        });
    }
}
