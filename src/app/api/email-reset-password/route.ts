import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import db from "@/lib/db";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { NODEMAILER_EMAIL, NODEMAILER_PW } = process.env;

        const existingUser = await db.user.findUnique({
            where: {
                email: body.to,
            },
        });
        if (!existingUser) {
            return NextResponse.json({ message: "User does not exist" });
        }

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            auth: {
                user: NODEMAILER_EMAIL,
                pass: NODEMAILER_PW,
            },
        });

        const mailOptions = {
            from: NODEMAILER_EMAIL,
            to: body.to,
            subject: `Reset Passowrd for account: ${body.to}`,
            text: `Access the following link in order to reset your password: https://mario.webmarc.cucuza.com/reset-password?query=${body.to}`,
        };
        transporter.sendMail(mailOptions, (err, info) => {
            console.log(info.messageId);
        });

        return NextResponse.json({ message: "Reset password email sent" });
    } catch (err) {
        console.log("err", err);
        return NextResponse.json({
            message: "Mail not sent",
        });
    }
}
