import React, { useEffect, useRef, useState } from "react";
import SocialMetadataLink from "./SocialMetaDataLink";
import { displayTailInSvg, displayTailOutSvg } from "./SelectedChat.utils";
import { Chat, Message, User, formatTime } from "@/app/common";

interface MessageTextProps {
    data: Chat | User;
    message: Message;
    isSender: boolean;
}

const MessageText: React.FC<MessageTextProps> = ({
    data,
    message,
    isSender = false,
}) => {
    const elementRef = useRef<HTMLDivElement | null>(null);

    const [longMsgHeight, setLongMsgHeight] = useState(200);
    const [isShowButtonVisible, setIsShowButtonVisible] = useState(false);

    const urlRegex = /(https?:\/\/\S+)/g;
    const parts = message.text.split(urlRegex).filter((part) => part);
    const uniqueParts = Array.from(new Set(parts));

    const handleShowMoreVisibility = () => {
        if (
            typeof elementRef.current?.clientHeight !== "undefined" &&
            longMsgHeight < elementRef.current?.clientHeight
        )
            setIsShowButtonVisible(true);
        else {
            setIsShowButtonVisible(false);
        }
    };

    useEffect(() => {
        setLongMsgHeight(400);
        handleShowMoreVisibility();
    }, [data.id, message]);

    useEffect(() => {
        handleShowMoreVisibility();
    }, [longMsgHeight]);

    return (
        <div className={`flex my-0.5 self-${isSender ? "end" : "start"}`}>
            {!isSender && displayTailInSvg()}
            <div
                className={`relative p-1.5 rounded-lg text-sm max-w-md ${
                    isSender
                        ? "bg-green-msg rounded-tr-[0]"
                        : "bg-white rounded-tl-[0]"
                } ${isShowButtonVisible ? "pb-8" : ""}`}
                style={{
                    maxHeight: `${longMsgHeight}px`,
                }}
            >
                <div
                    className={`break-all overflow-hidden ${
                        isShowButtonVisible ? "h-full" : ""
                    }`}
                >
                    <div
                        ref={elementRef}
                        className={`${
                            !isShowButtonVisible && "max-h-[400px]"
                        } ${isSender ? "bg-green-msg" : "bg-white"}`}
                    >
                        {uniqueParts.map((part, index) => {
                            if (urlRegex.test(part)) {
                                return (
                                    <SocialMetadataLink
                                        key={index}
                                        url={part}
                                    />
                                );
                            } else {
                                return <span key={index}>{part}</span>;
                            }
                        })}
                    </div>
                </div>
                <span
                    className={`block ${
                        isSender ? "bg-green-msg" : "bg-white"
                    } text-right text-[10px] text-gray-char`}
                >
                    {formatTime(message.createdAt)}
                </span>

                {isShowButtonVisible ? (
                    <span
                        className="absolute bottom-1 left-1.5 text-xs text-blue-link cursor-pointer"
                        onClick={() => setLongMsgHeight(longMsgHeight * 2)}
                    >
                        Show more
                    </span>
                ) : null}
            </div>
            {isSender && displayTailOutSvg()}
        </div>
    );
};

export default MessageText;
