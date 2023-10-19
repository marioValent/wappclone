import db from "@/lib/db";
import { verifyJWT } from "@/lib/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const token = body.token;
        const id = verifyJWT(token);

        const user = await db.user.findUnique({
            where: {
                id: id,
            },
        });

        if (!user) {
            return NextResponse.json({
                message: "User not found",
                user: null,
            });
        }

        const { password, ...userRest } = user;

        return NextResponse.json({
            message: "User found",
            user: userRest,
        });
    } catch (err) {
        console.log(err);
        return NextResponse.json({
            message: "User not found",
            user: null,
        });
    }
}
