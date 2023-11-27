import React, { useEffect, useRef, useState } from "react";
import SocialMetadataLink from "./SocialMetaDataLink";
import { Chat, Message, User, formatTime } from "@/app/common";

interface MessageTextProps {
    data: Chat | User;
    message: Message;
    globalClass?: string;
    senderClass?: string;
    receiverClass?: string;
}

const MessageText: React.FC<MessageTextProps> = ({
    data,
    globalClass = "relative p-1.5 rounded-lg text-sm max-w-md",
    message,
    receiverClass,
    senderClass,
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
        <div
            className={`${globalClass} ${senderClass} ${receiverClass} ${
                isShowButtonVisible ? "pb-8" : ""
            }`}
            style={{
                maxHeight: `${longMsgHeight}px`,
            }}
        >
            <div
                className={`break-all overflow-hidden ${
                    isShowButtonVisible ? "h-full" : ""
                }`}
            >
                <div ref={elementRef}>
                    {uniqueParts.map((part, index) => {
                        if (urlRegex.test(part)) {
                            return (
                                <SocialMetadataLink key={index} url={part} />
                            );
                        } else {
                            return <span key={index}>{part}</span>;
                        }
                    })}
                </div>
            </div>
            <span className="block text-right text-[10px] text-gray-char">
                {formatTime(message.createdAt)}
            </span>

            {isShowButtonVisible && (
                <span
                    className="absolute bottom-1 left-1.5 text-xs text-blue-link cursor-pointer"
                    onClick={() => setLongMsgHeight(longMsgHeight * 2)}
                >
                    Show more
                </span>
            )}
        </div>
    );
};

export default MessageText;
