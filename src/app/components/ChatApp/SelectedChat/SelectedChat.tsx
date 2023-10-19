import React from "react";
import Image from "next/image";
import myProfileIcon from "@/../public/myProfile.svg";
import { Chat } from "@/app/common";

interface SelectedChatProps {
    chat: Chat;
}

const SelectedChat: React.FC<SelectedChatProps> = ({ chat }) => {
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
                <h2>
                    {chat.friend?.firstName} {chat.friend?.lastName}
                </h2>
            </div>
            <div className="h-full z-20">
                {chat.messages?.length > 0 ? (
                    <ol>
                        {chat?.messages.map((message, index) => (
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
