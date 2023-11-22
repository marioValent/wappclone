import React, { useEffect, useRef, useState } from "react";
import SocialMetadataLink from "./SocialMetadataLink";
import { Chat, Message, MetaParser, User, formatTime } from "@/app/common";

interface MessageTextProps {
    data: Chat | User;
    message: Message;
    globalClass?: string;
    senderClass?: string;
    receiverClass?: string;
    handleMetaData: (data: MetaParser) => void;
}

const MessageText: React.FC<MessageTextProps> = ({
    data,
    globalClass = "relative p-1.5 rounded-lg text-sm max-w-md",
    message,
    receiverClass,
    senderClass,
    handleMetaData,
}) => {
    const elementRef = useRef<HTMLAnchorElement | null>(null);

    const [longMsgHeight, setLongMsgHeight] = useState(200);
    const [isShowButtonVisible, setIsShowButtonVisible] = useState(false);

    const urlRegex = /(https?:\/\/\S+)/g;
    const parts = message.text.split(urlRegex).filter((part) => part);

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
            <span
                className={`block break-all overflow-hidden ${
                    isShowButtonVisible ? "h-full" : ""
                }`}
            >
                <span ref={elementRef} className="block">
                    {parts.map((part, index) => {
                        if (urlRegex.test(part)) {
                            return (
                                <SocialMetadataLink
                                    handleMetaData={handleMetaData}
                                    key={index}
                                    url={part}
                                />
                            );
                        } else {
                            return <span key={index}>{part}</span>;
                        }
                    })}
                </span>
            </span>
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
