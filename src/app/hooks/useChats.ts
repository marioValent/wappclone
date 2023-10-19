import { useEffect, useState } from "react";
import { BASE_URL, Chat, getToken } from "../common";

export const useChats = (): Array<Chat> => {
    const token = getToken();
    const [chats, setChats] = useState([]);

    const getChats = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/chat/findAll`, {
                method: "POST",
                body: JSON.stringify({ token }),
            });

            if (response.ok) {
                const data = await response.json();
                setChats(data.chats);
            }
        } catch (error) {
            console.error("Error fetching chats", error);
        }
    };

    useEffect(() => {
        getChats();
    }, []);

    return chats;
};
