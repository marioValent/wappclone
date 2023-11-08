"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "../shared/Button";
import SideMenu from "./SideMenu/SideMenu";
import SelectedChat from "./SelectedChat/SelectedChat";
import chatImg from "@/../public/convesation-img-default.png";
import logoutIcon from "@/../public/logoutIcon.svg";
import { Chat, User, deleteToken, dictionary } from "@/app/common";

const logoutStyle = {
    filter: "brightness(0) invert(1)",
};

const ChatApp: React.FC = () => {
    const router = useRouter();
    const [selectedChat, setSelectedChat] = useState<Chat | User | null>(null);
    const messageInputRef = useRef<HTMLInputElement>(null);

    const handleChatSelect = (data: Chat | User) => {
        setSelectedChat(data);
    };

    const focusMessageInput = () => {
        messageInputRef.current?.focus();
    };

    useEffect(() => {
        if (selectedChat) {
            focusMessageInput();
        }
    }, [selectedChat]);

    const logout = () => {
        deleteToken();
        router.push("/");
    };

    return (
        <div className="flex h-full">
            <div className="w-1/3 bg-white">
                <SideMenu onSelect={handleChatSelect} />
            </div>
            <div className="w-2/3 bg-main-gray border-l border-main-gray-deeper">
                {selectedChat ? (
                    <SelectedChat
                        data={selectedChat}
                        ref={messageInputRef}
                        focusMessageInput={focusMessageInput}
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center h-full space-y-10">
                        <Image src={chatImg} alt="Profile Image" />
                        <div>
                            <h1 className="text-xl font-semibold">
                                Select a conversation to start the chat.
                            </h1>
                            <p className="text-gray-600 text-center">
                                Your personal messages are fully encrypted
                            </p>
                        </div>
                        <Button variant="dark" onClick={logout}>
                            <Image
                                style={logoutStyle}
                                src={logoutIcon}
                                alt="logout icon"
                            />
                            {dictionary.global.logoutBtn}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatApp;
