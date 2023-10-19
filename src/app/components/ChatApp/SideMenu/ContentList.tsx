import React from "react";
import { useChats } from "@/app/hooks";
import { Chat, User } from "@/app/common";

interface ContentListProps {
    id: string;
    isMain?: boolean;
    searchedChats?: Array<Chat>;
    searchedUsers: Array<User>;
    title: string;
    users: Array<User>;
    onSelect: (chat: Chat) => void;
}

const ContentList = ({
    id,
    isMain,
    searchedChats,
    searchedUsers,
    title,
    users,
    onSelect,
}: ContentListProps) => {
    const chats = useChats();

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
                                    onSelect(
                                        user.chat[0]
                                            ? user.chat[0]
                                            : ({} as Chat)
                                    );
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
    if (searchedChats?.length === 0 && searchedUsers.length === 0)
        return (
            <p className="text-center p-16 text-dark-gray">
                No chats, contacts or messages found.
            </p>
        );
    return (
        <div id={`content-list-${id}`}>
            {isMain && searchedChats && (
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
                                    {
                                        chat.messages[chat.messages.length - 1]
                                            ?.text
                                    }
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
