import { useEffect, useState } from "react";
import { User } from "../common";
import { getToken } from "../common";

export const useCurrentUser = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch("/api/user/findOne", {
                method: "POST",
                body: JSON.stringify({
                    token: getToken(),
                }),
            });

            console.log("inside fetch user");

            const json = await res.json();

            console.log("json", json);

            setUser(json.user);
        };

        fetchUser();
    }, []);

    return user;
};
