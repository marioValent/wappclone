import React, { forwardRef, useState } from "react";
import Image from "next/image";
import Input from "../../shared/Input";
import attachIcon from "@/../public/attachIcon.svg";
import emojiIcon from "@/../public/emojiIcon.svg";
import keyboardVoiceIcon from "@/../public/keyboardVoiceIcon.svg";
import myProfileIcon from "@/../public/myProfile.svg";
import sendArrow from "@/../public/sendArrow.svg";
import {
    displayTailInSvg,
    displayTailOutSvg,
    formatTime,
} from "./SelectedChat.utils";
import { Chat, User, dictionary } from "@/app/common";

interface SelectedChatProps {
    data: Chat | User;
}

const SelectedChat = forwardRef<HTMLInputElement, SelectedChatProps>(
    function SelectedChat({ data }, ref) {
        const [messageInputValue, setMessageInputValue] = useState("");

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
                console.log(data.messages);
                return data;
            }
            return {} as Chat;
        };

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = e.target;
            setMessageInputValue(value);
        };

        const handleKeyPress = (
            event: React.KeyboardEvent<HTMLInputElement>
        ) => {
            if (event.key === "Enter") {
                console.log("Enter clicked");
            }
        };

        return (
            <div className="relative z-10 h-full">
                <div className="flex flex-col h-full bg-chat-panel">
                    <div className="absolute h-full w-full bg-[url('/selected-chat-background.png')] bg-repeat bg-contain opacity-40"></div>
                    <div className="flex justify-start items-center gap-2 bg-main-gray border-l border-main-gray-deeper py-1 px-4 z-20">
                        <Image
                            src={myProfileIcon}
                            alt="profile icon"
                            style={{ width: "3rem", height: "3rem" }}
                        />
                        <h2>{getNavbarData()}</h2>
                    </div>
                    <div className="h-full grid overflow-auto scrollbar z-20">
                        {getContentData()?.messages?.length > 0 ? (
                            <ol className="flex flex-col-reverse flex-grow px-16 py-4">
                                {getContentData()?.messages.map(
                                    (message, index) => (
                                        <li
                                            key={index}
                                            className={`flex my-0.5 self-${
                                                message.senderId ===
                                                getContentData().userId
                                                    ? "end"
                                                    : "start"
                                            }`}
                                        >
                                            {message.senderId ===
                                            getContentData().userId ? (
                                                <>
                                                    <span className="relative p-1.5 pr-10 rounded-lg rounded-tr-[0] text-sm max-w-md bg-green-msg">
                                                        {message.text}
                                                        <span className="absolute bottom-0 right-2 text-[10px] text-[#667781]">
                                                            {formatTime(
                                                                message.createdAt
                                                            )}
                                                        </span>
                                                    </span>

                                                    {displayTailOutSvg()}
                                                </>
                                            ) : (
                                                <>
                                                    {displayTailInSvg()}

                                                    <span className="relative p-1.5 pr-10 rounded-lg rounded-tl-[0] text-sm max-w-md bg-white">
                                                        {message.text}
                                                        <span className="absolute bottom-0 right-2 text-[10px] text-[#667781]">
                                                            {formatTime(
                                                                message.createdAt
                                                            )}
                                                        </span>
                                                    </span>
                                                </>
                                            )}
                                        </li>
                                    )
                                )}
                            </ol>
                        ) : null}
                    </div>
                    <div className="flex items-center px-4 gap-2 bg-main-gray h-20 z-20">
                        <div className="flex justify-center gap-3 w-[10%]">
                            <Image
                                alt="emoji-icon"
                                src={emojiIcon}
                                className="w-7 cursor-pointer"
                            />
                            <Image
                                alt="attachIcon-icon"
                                className="w-7 cursor-pointer"
                                src={attachIcon}
                                title="Attach"
                            />
                        </div>
                        <Input
                            id="send-message-input"
                            classNameDiv="w-full"
                            className="input bg-white focus:outline-none p-3"
                            placeholder={
                                dictionary.selectedChat.messageInputPlaceholder
                            }
                            ref={ref}
                            value={messageInputValue}
                            onKeyDown={handleKeyPress}
                            onChange={handleInputChange}
                        />
                        {messageInputValue ? (
                            <Image
                                alt="send-arrow-icon"
                                src={sendArrow}
                                className="w-8 cursor-pointer"
                            />
                        ) : (
                            <Image
                                alt="keyboard-voice-icon"
                                src={keyboardVoiceIcon}
                                className="w-8 cursor-pointer"
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    }
);

export default SelectedChat;
