import React from "react";
import Image from "next/image";
import myProfileIcon from "@/../public/myProfile.svg";
import { Chat, User } from "@/app/common";

interface SelectedChatProps {
    data: Chat | User;
}

const SelectedChat: React.FC<SelectedChatProps> = ({ data }) => {
    const isUser = (data: Chat | User): data is User => {
        return (data as User).firstName !== undefined;
    };

    const isChat = (data: Chat | User): data is Chat => {
        return (data as Chat).friend !== undefined;
    };

    const getNavbarData = () => {
        if (isUser(data)) {
            return `${data.firstName} ${data.lastName}`;
        } else if (isChat(data)) {
            return `${data.friend.firstName} ${data.friend.lastName}`;
        }
        return;
    };

    const getContentData = (): Chat => {
        if (isUser(data)) {
            return data.chat[0];
        } else if (isChat(data)) {
            return data;
        }
        return {} as Chat;
    };

    return (
        // <div className="relative z-10 h-full">
        <div className="relative flex flex-col h-full bg-chat-panel">
            <div className="absolute h-full w-full bg-[url('/selected-chat-background.png')] bg-repeat bg-contain opacity-40"></div>
            <div className="flex justify-start items-center gap-2 bg-main-gray border-l border-main-gray-deeper py-1 px-4 z-20">
                <Image
                    src={myProfileIcon}
                    alt="profile icon"
                    style={{ width: "3rem", height: "3rem" }}
                />
                <h2>{getNavbarData()}</h2>
            </div>
            <div className="h-full z-20">
                {getContentData()?.messages?.length > 0 ? (
                    <ol>
                        {getContentData()?.messages.map((message, index) => (
                            <li key={index}>{message.text}</li>
                        ))}
                    </ol>
                ) : null}
            </div>
            <div className="bg-main-gray h-16 z-20">
                Here goes message input
            </div>
        </div>
        // </div>
    );
};

export default SelectedChat;
