import { useEffect, useState } from "react";
import { BASE_URL, User, getToken } from "../common";

export const useUsers = (): User[] => {
    const token = getToken();
    const [users, setUsers] = useState(Array<User>);

    const getUsers = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/user/findAll`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token }),
            });
            if (response.ok) {
                const data = await response.json();
                const users: User[] = data.users;

                users.sort((a, b) => {
                    if (a.firstName < b.firstName) return -1;
                    if (a.firstName < b.firstName) return 1;
                    return 0;
                });
                setUsers(users);
            } else {
                console.error("API call failed:", response.status);
            }
        } catch (error) {
            console.error("Display users list failed:", error);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    return users;
};
