import { useEffect, useState } from "react";
import { BASE_URL, User } from "../common";
import { getToken } from "../common";
import axios from "axios";

export const useCurrentUser = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const getCurrentUser = async () => {
        try {
            axios
                .post(`${BASE_URL}/api/user/findOne`, {
                    token: getToken(),
                })
                .then((response) => {
                    setCurrentUser(response.data.user);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } catch (error) {
            throw error;
        }
    };

    useEffect(() => {
        getCurrentUser();
    }, []);

    return {
        currentUser,
        isLoading,
    };
};
