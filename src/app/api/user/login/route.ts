import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { signJWT } from "@/lib/jwt";
import { comparePassword } from "@/lib/bcrypt";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const foundUser = await db.user.findFirst({
            where: {
                email: body.email,
            },
        });

        if (!foundUser) {
            return NextResponse.json({
                message: "User not found",
                token: null,
            });
        }

        const passwordMatch = await comparePassword(
            body.password,
            foundUser?.password
        );

        if (!passwordMatch) {
            return NextResponse.json({
                message: "Passwords do not match",
                token: null,
            });
        }

        const token = signJWT(foundUser.id);

        return NextResponse.json({
            message: "User found",
            token: token,
        });
    } catch (err) {
        return NextResponse.json({
            message: "User not found",
            token: null,
        });
    }
}
