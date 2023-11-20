import React, { useEffect, useRef, useState } from "react";
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
    globalClass = "relative p-1.5 pr-10 rounded-lg text-sm max-w-md",
    message,
    receiverClass,
    senderClass,
}) => {
    const elementRef = useRef<HTMLAnchorElement | null>(null);

    const [longMsgHeight, setLongMsgHeight] = useState(200);
    const [isShowButtonVisible, setIsShowButtonVisible] = useState(true);

    const urlRegex = /(https?:\/\/\S+)/g;
    const parts = message.text.split(urlRegex);

    useEffect(() => {
        setLongMsgHeight(200);
    }, [data.id]);

    useEffect(() => {
        if (
            typeof elementRef.current?.clientHeight !== "undefined" &&
            longMsgHeight >= elementRef.current?.clientHeight
        )
            setIsShowButtonVisible(false);
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
            <span className="block break-all h-full overflow-hidden">
                {parts.map((part, index) => {
                    if (urlRegex.test(part)) {
                        return (
                            <a
                                ref={elementRef}
                                key={index}
                                href={part}
                                target="_blank"
                                className="text-blue-link hover:underline"
                            >
                                {part}
                            </a>
                        );
                    } else {
                        return (
                            <span
                                className="block"
                                ref={elementRef}
                                key={index}
                            >
                                {part}
                            </span>
                        );
                    }
                })}
                <span className="absolute bottom-0 right-2 text-[10px] text-gray-char">
                    {formatTime(message.createdAt)}
                </span>
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
