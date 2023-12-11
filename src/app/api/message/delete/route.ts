import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
    try {
        const { messageId } = await request.json();

        await db.message.delete({
            where: { id: messageId },
        });

        return NextResponse.json({
            message: "Message deleted",
            data: null,
        });
    } catch (err) {
        return NextResponse.json({
            message: "Message not deleted",
            data: null,
        });
    }
}
