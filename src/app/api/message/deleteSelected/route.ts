import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
    try {
        const { messageIds } = await request.json();

        // Ensure messageIds is an array
        if (!Array.isArray(messageIds)) {
            throw new Error("Invalid input. Expected an array of message IDs.");
        }

        // Delete messages based on the array of message IDs
        await Promise.all(
            messageIds.map(async (messageId) => {
                await db.message.delete({
                    where: { id: messageId },
                });
            })
        );

        return NextResponse.json({
            message: "Messages deleted",
            data: null,
        });
    } catch (err) {
        return NextResponse.json({
            message: "Messages not deleted",
            data: null,
        });
    }
}
