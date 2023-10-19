import { hashPassword } from "@/lib/bcrypt";
import db from "@/lib/db";
import { signJWT } from "@/lib/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const hashedPassword = await hashPassword(body.password);
        const user = await db.user.create({
            data: { ...body, password: hashedPassword },
        });

        const token = signJWT(user.id);

        return NextResponse.json({
            message: "User created",
            token: token,
        });
    } catch (err) {
        return NextResponse.json({
            message: "User not created",
            token: null,
        });
    }
}
