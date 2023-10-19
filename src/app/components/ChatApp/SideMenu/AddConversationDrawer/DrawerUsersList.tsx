import React from "react";
import { Chat, User } from "@/app/common";

interface DrawerUsersListProps {
    searchedUsers: Array<User>;
    users: Array<User>;
    onSelect: (chat: Chat) => void;
}

const DrawerUsersList = ({
    searchedUsers,
    users,
    onSelect,
}: DrawerUsersListProps) => {
    return (
        <>
            <h2 className="pl-7 pt-4 text-main-green">CONTACTS ON WAPPCLONE</h2>
            <ul className="pt-4">
                {(searchedUsers ? searchedUsers : users).map((user, index) => (
                    <li
                        key={index}
                        className="w-full p-3 border-t-2 border-main-gray text-left cursor-pointer hover:bg-main-gray"
                        onClick={() => {
                            console.log("Drawer:", user);
                            onSelect(
                                user.chat[0] ? user.chat[0] : ({} as Chat)
                            );
                        }}
                    >
                        {user.firstName} {user.lastName}
                    </li>
                ))}
            </ul>
        </>
    );
};

export default DrawerUsersList;
