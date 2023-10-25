import React from "react";
import Image from "next/image";
import { useChats, useUsers } from "@/app/hooks";
import { Chat, User } from "@/app/common";
import loadingIcon from "@/../public/loadingIcon.svg";

interface ContentListProps {
    id: string;
    isMain?: boolean;
    searchedChats?: Array<Chat>;
    searchedUsers?: Array<User> | null;
    title: string;
    onSelect: (data: User | Chat) => void;
}

const ContentList = ({
    id,
    isMain = true,
    searchedChats,
    searchedUsers,
    title,
    onSelect,
}: ContentListProps) => {
    const { chats, isLoading } = useChats();
    const users = useUsers();

    const renderContactsList = () => {
        return (
            <div id={`contacts-list-${id}`}>
                <h2 className="pl-7 py-4 text-main-green">{title}</h2>
                <ul>
                    {(searchedUsers ? searchedUsers : users).map(
                        (user, index) => (
                            <li
                                key={index}
                                className="w-full p-3 pl-7 border-t border-main-gray text-left cursor-pointer hover:bg-main-gray"
                                onClick={() => {
                                    onSelect(user);
                                }}
                            >
                                {user.firstName} {user.lastName}
                            </li>
                        )
                    )}
                </ul>
            </div>
        );
    };

    if (isLoading)
        return (
            <Image
                alt="loading-spiner"
                src={loadingIcon}
                className="mx-auto mt-16 animate-spin"
            />
        );
    if (searchedChats?.length === 0 && searchedUsers?.length === 0)
        return (
            <p className="text-center p-16 text-dark-gray">
                No chats, contacts or messages found.
            </p>
        );

    return (
        <div
            id={`content-list-${id}`}
            className="h-full overflow-auto scrollbar"
        >
            {isMain && searchedChats && searchedChats?.length > 0 && (
                <h2 className="pl-7 py-4 text-main-green">CHATS</h2>
            )}

            {isMain && (
                <ul>
                    {(searchedChats ? searchedChats : chats)?.map(
                        (chat, index) => (
                            <li
                                key={index}
                                className="w-full p-3 pl-7 border-t border-main-gray text-left cursor-pointer hover:bg-main-gray"
                                onClick={() => onSelect(chat)}
                            >
                                <h2>
                                    {chat.friend.firstName}{" "}
                                    {chat.friend.lastName}
                                </h2>
                                <p className="text-sm">
                                    {chat.messages[0]?.text}
                                </p>
                            </li>
                        )
                    )}
                </ul>
            )}

            {isMain
                ? searchedUsers && renderContactsList()
                : renderContactsList()}
        </div>
    );
};

export default ContentList;
