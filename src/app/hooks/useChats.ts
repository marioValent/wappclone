import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, getToken } from "../common";

export const useChats = () => {
    const token = getToken();
    const [chats, setChats] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getChats = async () => {
        try {
            axios
                .post(`${BASE_URL}/api/chat/findAll`, {
                    token: token,
                })
                .then((response) => {
                    setChats(response.data.chats);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } catch (error) {
            throw error;
        }
    };

    useEffect(() => {
        getChats();
    }, []);

    return {
        chats,
        isLoading,
    };
};
