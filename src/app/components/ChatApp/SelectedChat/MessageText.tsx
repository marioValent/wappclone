import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import axios from "axios";
import SocialMetadataLink from "./SocialMetaDataLink";
import Dropdown from "../../shared/Dropdown";
import checkedBox from "@/../public/checked-box.svg";
import uncheckedBox from "@/../public/unchecked-box.svg";
import {
    displayDropDownArrow,
    displayTailInSvg,
    displayTailOutSvg,
} from "./SelectedChat.utils";
import { BASE_URL, Chat, Message, User, formatTime } from "@/app/common";

interface MessageTextProps {
    data: Chat | User;
    message: Message;
    isSender: boolean;
    messages: Message[];
    msgListRef: React.MutableRefObject<HTMLOListElement | null>;
    messageSelectionActive: boolean;
    selectedMessages: Message[];
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
    onDropdownToggle: (isOpen: boolean) => void;
    onHandleClick: () => void;
}

const MessageText: React.FC<MessageTextProps> = ({
    data,
    message,
    isSender = false,
    messages,
    msgListRef,
    messageSelectionActive,
    selectedMessages,
    setMessages,
    onDropdownToggle,
    onHandleClick,
}) => {
    const msgContainerRef = useRef<HTMLDivElement | null>(null);
    const messageRef = useRef<HTMLDivElement | null>(null);

    const [dropdownBottom, setDropDownBottom] = useState(0);
    const [dropdownLeft, setDropdownLeft] = useState(0);

    const msgDropdownLeft =
        (msgContainerRef.current?.offsetLeft ?? 0) +
        (msgContainerRef.current?.clientWidth ?? 0) -
        (isSender ? 180 : 25);

    const msgContaierOffsetBottom =
        (msgListRef.current?.offsetHeight ?? 0) -
        (msgContainerRef.current?.offsetTop ?? 0);

    const [longMsgHeight, setLongMsgHeight] = useState(200);
    const [isShowButtonVisible, setIsShowButtonVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const isSelected = selectedMessages.some(
        (selectedMessage) => selectedMessage.id === message.id
    );

    const urlRegex = /(https?:\/\/\S+)/g;
    const parts = message.text?.split(urlRegex).filter((part) => part);
    const uniqueParts = Array.from(new Set(parts));

    const handleShowMoreVisibility = () => {
        if (
            typeof messageRef.current?.clientHeight !== "undefined" &&
            longMsgHeight < messageRef.current?.clientHeight
        )
            setIsShowButtonVisible(true);
        else {
            setIsShowButtonVisible(false);
        }
    };

    const handleMouseToggle = () => !isDropdownOpen && setIsHovered(!isHovered);

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const deleteMessage = (idToDelete: string) => {
        const updatedMessages = messages.filter(
            (message) => message.id !== idToDelete
        );
        setMessages(updatedMessages);
    };
    const handleDeleteMessage = async () => {
        setIsDropdownOpen(false);
        setIsHovered(false);
        try {
            await axios.delete(`${BASE_URL}/api/message/delete`, {
                headers: {
                    "Content-Type": "application/json",
                },
                data: {
                    messageId: message.id,
                },
            });

            deleteMessage(message.id);
        } catch (error) {
            console.error("Error deleting message:", error);
        }
    };

    useEffect(() => {
        setDropdownLeft(msgDropdownLeft);
    }, [msgDropdownLeft]);

    useEffect(() => {
        setDropDownBottom(msgContaierOffsetBottom - 75);
    }, [msgContaierOffsetBottom]);

    useEffect(() => {
        setLongMsgHeight(400);
        handleShowMoreVisibility();
    }, [data.id, message]);

    useEffect(() => {
        handleShowMoreVisibility();
    }, [longMsgHeight]);

    useEffect(() => {
        isDropdownOpen && setIsHovered(true);
    }, []);

    useEffect(() => {
        onDropdownToggle(isDropdownOpen);
    }, [isDropdownOpen]);

    return (
        <div
            className={`flex px-10 ${isSender ? "justify-between" : "gap-4"} ${
                !messageSelectionActive && isSender && "self-end"
            } ${
                messageSelectionActive &&
                `cursor-pointer ${
                    isSelected
                        ? "bg-msg-select-hover"
                        : "hover:bg-msg-select-hover"
                } `
            }`}
            onClick={onHandleClick}
        >
            {messageSelectionActive && (
                <Image
                    alt="unchecked-box"
                    src={isSelected ? checkedBox : uncheckedBox}
                />
            )}
            <div
                ref={msgContainerRef}
                className={`relative flex my-0.5 self-${
                    isSender ? "end" : "start"
                }`}
                onMouseEnter={handleMouseToggle}
                onMouseLeave={handleMouseToggle}
            >
                {isHovered && (
                    <div
                        id="dropdown-btn"
                        className={`absolute p-1 z-10 top-0 cursor-pointer rounded-md shadow-md ${
                            isSender
                                ? "right-2 shadow-green-msg bg-green-msg"
                                : "right-0 shadow-white bg-white"
                        }`}
                        onClick={handleDropdownToggle}
                    >
                        {displayDropDownArrow()}
                    </div>
                )}
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
                            ref={messageRef}
                            className={`${
                                typeof messageRef.current?.clientHeight ===
                                    "undefined" && "max-h-[400px]"
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
                {isDropdownOpen &&
                    createPortal(
                        <Dropdown
                            dropdownBottom={dropdownBottom}
                            dropdownLeft={dropdownLeft}
                            handleBtnClick={handleDeleteMessage}
                        >
                            Delete
                        </Dropdown>,
                        document.getElementById("message-list") || document.body
                    )}
            </div>
        </div>
    );
};

export default MessageText;
