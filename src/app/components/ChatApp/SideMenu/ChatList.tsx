import React from "react";
import { useChats } from "@/app/hooks";
import { Chat, User } from "@/app/common";

interface ChatListProps {
    searchedChats: Array<Chat>;
    searchedUsers: Array<User>;
    users: Array<User>;
    onSelect: (chat: Chat) => void;
}

const ChatList = ({
    searchedChats,
    searchedUsers,
    users,
    onSelect,
}: ChatListProps) => {
    const chats = useChats();

    return (
        <div>
            {searchedChats && (
                <h2 className="pl-7 pt-4 text-main-green text-lg">CHATS</h2>
            )}
            <ul>
                {(searchedChats ? searchedChats : chats)?.map((chat, index) => (
                    <li
                        key={index}
                        className="w-full p-3 border-t border-main-gray text-left cursor-pointer hover:bg-main-gray"
                        onClick={() => onSelect(chat)}
                    >
                        <h2>
                            {chat.friend.firstName} {chat.friend.lastName}
                        </h2>
                        <p className="text-sm">
                            {chat.messages[chat.messages.length - 1]?.text}
                        </p>
                    </li>
                ))}
            </ul>
            {searchedUsers && (
                <div>
                    <h2 className="pl-7 pt-4 text-main-green text-lg">
                        CONTACTS
                    </h2>
                    <ul className="pt-4">
                        {(searchedUsers ? searchedUsers : users).map(
                            (user, index) => (
                                <li
                                    key={index}
                                    className="w-full p-3 border-t-2 border-main-gray text-left cursor-pointer hover:bg-main-gray"
                                    onClick={() => {
                                        console.log("List:", user);
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
            )}
        </div>
    );
};

export default ChatList;
