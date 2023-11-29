import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { hashPassword } from "@/lib/bcrypt";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const user = await db.user.findFirst({
            where: {
                email: body.email,
            },
        });

        if (user) {
            const newPasswordHash = await hashPassword(body.newPassword);

            await db.user.update({
                where: {
                    email: body.email,
                },
                data: {
                    password: newPasswordHash,
                },
            });

            return NextResponse.json({
                message: "Password reset successfully",
            });
        } else {
            return NextResponse.json({ message: "User not found" });
        }
    } catch (err) {
        console.log("err: ", err);
        return NextResponse.json({ message: "Password reset unsuccesfully" });
    }
}
