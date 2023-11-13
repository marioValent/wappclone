import React from "react";
import Image from "next/image";
import { useChats, useCurrentUser, useUsers } from "@/app/hooks";
import loadingIcon from "@/../public/loadingIcon.svg";
import {
    Chat,
    User,
    isCurrentUser,
    formatDay,
    formatTime,
    isAfterMidnight,
} from "@/app/common";

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
    const currentUser = useCurrentUser();

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
                            <div
                                key={index}
                                className="w-full p-3 pl-7 border-t border-main-gray text-left cursor-pointer hover:bg-main-gray"
                                onClick={() => onSelect(chat)}
                            >
                                <div className="flex justify-between items-center">
                                    <h2>
                                        {!isCurrentUser(
                                            chat.userId,
                                            currentUser?.id || ""
                                        )
                                            ? `${chat.user.firstName} ${chat.user.lastName}`
                                            : `${chat.friend.firstName}
                                    ${chat.friend.lastName}`}
                                    </h2>
                                    <span className="text-xs text-[#667781]">
                                        {isAfterMidnight(
                                            chat.messages[0]?.createdAt
                                        )
                                            ? formatTime(
                                                  chat.messages[0]?.createdAt
                                              )
                                            : formatDay(
                                                  chat.messages[0]?.createdAt
                                              )}
                                    </span>
                                </div>
                                <p className="text-sm">
                                    {chat.messages[0]?.text}
                                </p>
                            </div>
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
