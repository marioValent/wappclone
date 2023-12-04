import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { hashPassword } from "@/lib/bcrypt";
import { verifyJWT } from "@/lib/jwt";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Verify the token
        const token = body.token;
        const decodedToken = verifyJWT(token);

        if (!decodedToken) {
            return NextResponse.json({ message: "Invalid token" });
        }

        // Check if the token exists and is not used in the database
        const passwordResetEntry = await db.passwordReset.findFirst({
            where: {
                userId: decodedToken.userId,
                token,
                used: false,
                expiresAt: {
                    gte: new Date(), // Check if expiresAt is greater than or equal to the current date
                },
            },
        });

        if (!passwordResetEntry) {
            return NextResponse.json({
                error: "TokenExpiredError",
                message:
                    "The password reset link has expired. Please initiate the password reset process again.",
            });
        }

        // Mark the token as used in the database
        await db.passwordReset.update({
            where: { id: passwordResetEntry.id },
            data: { used: true },
        });

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
