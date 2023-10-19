import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get("query");

        if (!query) {
            return NextResponse.json({
                message: "Please provide a query",
                users: null,
            });
        }

        const foundUsers = await db.user.findMany({
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
                    {
                        phone: {
                            contains: query,
                            mode: "insensitive",
                        },
                    },
                ],
            },
            include: {
                chat: {
                    include: {
                        messages: true,
                    },
                },
            },
        });

        return NextResponse.json({
            message: "Users found",
            users: foundUsers,
        });
    } catch (err) {
        return NextResponse.json({
            message: "No users found",
            users: null,
        });
    }
}
