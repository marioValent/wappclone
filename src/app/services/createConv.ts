import { BASE_URL } from "@/app/common/constants";

export async function createChat(createConv: {
    userId: string;
    friendId: string;
}) {
    const response = await fetch(`${BASE_URL}/api/create-chat`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ createConv }),
    });

    if (!response.ok) {
        throw new Error("Chat creation failed");
    }

    return response.json();
}
