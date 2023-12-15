import React, {
    Fragment,
    forwardRef,
    useEffect,
    useRef,
    useState,
} from "react";
import Image from "next/image";
import AttachDocument from "./AttachDocument";
import EmojiDrawer from "./EmojiDrawer";
import Input from "../../shared/Input";
import MessageText from "./MessageText";
import Spinner from "../../shared/Spinner";
import SelectedChatNavbar from "./SelectedChatNavbar";
import { useCurrentUser, useSocket } from "@/app/hooks";
import closeIcon from "@/../public/closeIcon.svg";
import emojiIcon from "@/../public/emojiIcon.svg";
import keyboardVoiceIcon from "@/../public/keyboardVoiceIcon.svg";
import sendArrowIcon from "@/../public/sendArrow.svg";
import {
    displayBin,
    displayDate,
    displayDownArrow,
    getContentData,
} from "./SelectedChat.utils";
import {
    BASE_URL,
    Chat,
    Message,
    User,
    dictionary,
    formatDay,
    getToken,
} from "@/app/common";
import axios from "axios";

interface SelectedChatProps {
    data: Chat | User;
    focusMessageInput: () => void;
    setSelectedChat: React.Dispatch<React.SetStateAction<Chat | User | null>>;
}

const SelectedChat = forwardRef<HTMLInputElement, SelectedChatProps>(
    ({ data, focusMessageInput, setSelectedChat }, ref) => {
        const scrollRef = useRef<HTMLDivElement | null>(null);
        const msgListRef = useRef<HTMLOListElement | null>(null);
        const { currentUser, isLoading } = useCurrentUser();
        const socket = useSocket();

        const [isDrawerOpen, setDrawerOpen] = useState(false);

        const [messages, setMessages] = useState<Message[]>([]);
        const [messageInputValue, setMessageInputValue] = useState("");
        const [messageSent, setMessageSent] = useState(0);

        const [showScrollToBottomArrow, setShowScrollToBottomArrow] =
            useState(false);

        // from MessageText - get isDropdownOpen value
        const [isDropdownOpen, setIsDropdownOpen] = useState(false);
        const [initialScrollPosition, setInitialScrollPosition] = useState(0);

        const getDropdownState = (isOpen: boolean) => {
            setIsDropdownOpen(isOpen);
        };
        // end

        // to SelectedChatNavbar
        const [messageSelectionActive, setMessageSelectionActive] =
            useState(false);
        // end

        // message selection logic start
        const [selectedMessages, setSelectedMessages] = useState<Message[]>([]);

        const onMessageSelectedClick = (message: Message) => {
            // Check if the message is already selected
            const isSelected = selectedMessages.some(
                (selectedMessage) => selectedMessage.id === message.id
            );

            if (isSelected) {
                // If already selected, remove it from the selectedMessages array
                setSelectedMessages((prevSelectedMessages) =>
                    prevSelectedMessages.filter(
                        (selectedMessage) => selectedMessage.id !== message.id
                    )
                );
            } else {
                // If not selected, add it to the selectedMessages array
                setSelectedMessages((prevSelectedMessages) => [
                    ...prevSelectedMessages,
                    message,
                ]);
            }
        };
        // message selection logic end

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = e.target;
            setMessageInputValue(value);
        };

        const scrollToBottom = () => {
            if (scrollRef.current) {
                scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
            }
        };

        const joinRoom = (id: string) => {
            socket.emit("join-room", id);
        };

        const handleSendMessage = async () => {
            if (getContentData(data) === undefined && messageInputValue) {
                try {
                    const chatResponse = await axios.post(
                        `${BASE_URL}/api/chat/create`,
                        {
                            token: getToken(),
                            friendId: data.id,
                        }
                    );
                    const chatData = chatResponse.data.chat;

                    joinRoom(chatData?.id);

                    socket.emit(
                        "send-message",
                        chatData?.id,
                        chatData?.userId,
                        chatData?.friendId,
                        messageInputValue
                    );
                    setSelectedChat(chatData);
                    setMessageInputValue("");
                } catch (error) {
                    throw error;
                }
            } else if (messageInputValue) {
                socket.emit(
                    "send-message",
                    data.id,
                    currentUser?.id,
                    (data as Chat).friendId,
                    messageInputValue
                );
                setMessageInputValue("");
            }
        };

        // Delete selected messages logic start
        const selectedMessageIds: string[] = selectedMessages.map(
            (message) => message.id
        );

        const deleteMessages = (idsToDelete: string[]) => {
            const updatedMessages = messages.filter(
                (message) => !idsToDelete.includes(message.id)
            );
            setMessages(updatedMessages);
        };

        const handleDeleteMessages = async () => {
            try {
                await axios.delete(`${BASE_URL}/api/message/deleteSelected`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: {
                        messageIds: selectedMessageIds,
                    },
                });
                deleteMessages(selectedMessageIds);
                setMessageSelectionActive(false);
                setSelectedMessages([]);
            } catch (error) {
                console.error("Error deleting selected messages:", error);
            }
        };
        // Delete selected messages logic end

        const onEnterDown = async (
            event: React.KeyboardEvent<HTMLInputElement>
        ) => {
            if (event.key === "Enter") handleSendMessage();
        };

        const openEmojiDrawer = () => {
            setDrawerOpen(true);
        };
        const closeEmojiDrawer = () => {
            setDrawerOpen(false);
        };

        const handleEmojiSelect = (emoji: string) => {
            setMessageInputValue(
                (prevMessageInputValue) => prevMessageInputValue + emoji
            );
        };

        const handleCloseMsgSelection = () => {
            setMessageSelectionActive(false);
            setSelectedMessages([]);
        };

        // function to show the arrow that scrolls to the bottom
        const handleDisplayArrowToBottomScroll = () => {
            if (scrollRef.current) {
                const isScrolledToBottom: boolean =
                    Math.ceil(scrollRef.current.scrollTop) ===
                    scrollRef.current.scrollHeight -
                        scrollRef.current.clientHeight;

                setShowScrollToBottomArrow(!isScrolledToBottom);
            }
        };

        useEffect(() => {
            const handleConnect = () => {
                joinRoom(data.id);
            };
            const handleReceivedMessage = (message: Message) => {
                setMessages((prev) => [message, ...prev]);
                setMessageSent((prev) => prev + 1);
            };

            socket.on("connect", handleConnect);
            socket.on("received-messages", handleReceivedMessage);

            return () => {
                socket.off("connect", handleConnect);
                socket.off("received-messages", handleReceivedMessage);
            };
        }, [socket]);

        useEffect(() => {
            joinRoom((data as Chat).id);
            if (isDrawerOpen) setDrawerOpen(false);
            setMessages(getContentData(data)?.messages);
        }, [data.id]);

        // block the scrollbar when dropdown is open
        useEffect(() => {
            if (isDropdownOpen && scrollRef.current) {
                setInitialScrollPosition(scrollRef.current.scrollTop);
            }
        }, [isDropdownOpen]);

        const handleScroll = () => {
            if (isDropdownOpen && scrollRef.current) {
                scrollRef.current.scrollTop = initialScrollPosition;
            }
            handleDisplayArrowToBottomScroll();
            return;
        };
        // end block the scrollbar

        // move scrollbar to bottom start
        const [chatId, setChatId] = useState("");
        useEffect(() => {
            setChatId(data.id);
        }, [data.id]);

        useEffect(() => {
            scrollToBottom();
        }, [isLoading, messageSent, chatId]);
        // move scrollbar to bottom end

        // different props start
        const emojiIconProps = isDrawerOpen
            ? {
                  alt: "close-icon",
                  src: closeIcon,
                  onClick: closeEmojiDrawer,
              }
            : {
                  alt: "emoji-icon",
                  src: emojiIcon,
                  onClick: openEmojiDrawer,
              };

        const sendArrowIconProps = messageInputValue
            ? {
                  alt: "send-arrow-icon",
                  src: sendArrowIcon,
                  onClick: handleSendMessage,
              }
            : {
                  alt: "keyboard-voice-icon",
                  src: keyboardVoiceIcon,
              };
        // different props end

        if (isLoading) return <Spinner customClassName="h-5/6" />;

        return (
            <div className="relative z-10 h-full">
                <div className="flex flex-col h-full bg-chat-panel">
                    <div
                        className={`absolute h-full w-full ${
                            !messageSelectionActive &&
                            "bg-[url('/selected-chat-background.png')] bg-repeat bg-contain"
                        } opacity-40`}
                    ></div>
                    <SelectedChatNavbar
                        currentUser={currentUser}
                        data={data}
                        setMessageSelectionActive={setMessageSelectionActive}
                    />
                    <div
                        className="h-full grid overflow-auto scrollbar z-20"
                        ref={scrollRef}
                        onScroll={handleScroll}
                    >
                        {messages?.length > 0 ? (
                            <ol
                                id="message-list"
                                ref={msgListRef}
                                className="relative flex flex-col-reverse flex-grow py-4"
                            >
                                {messages.map((message, index) => (
                                    <Fragment key={message.id}>
                                        <MessageText
                                            data={data}
                                            isSender={
                                                message.senderId ===
                                                currentUser?.id
                                            }
                                            msgListRef={msgListRef}
                                            message={message}
                                            messages={messages}
                                            messageSelectionActive={
                                                messageSelectionActive
                                            }
                                            selectedMessages={selectedMessages}
                                            setMessages={setMessages}
                                            onDropdownToggle={getDropdownState}
                                            onHandleClick={() =>
                                                onMessageSelectedClick(message)
                                            }
                                        />
                                        {displayDate(
                                            index,
                                            index + 1,
                                            messages
                                        ) ? (
                                            <span className="bg-white text-sm text-[#54656F] p-2 my-4 rounded-lg z-30 w-fit flex mx-auto">
                                                {formatDay(message.createdAt)}
                                            </span>
                                        ) : null}
                                    </Fragment>
                                ))}
                            </ol>
                        ) : null}
                        {showScrollToBottomArrow && (
                            <span
                                className="absolute bottom-[5.5rem] right-3 bg-white shadow-md cursor-pointer rounded-full p-1.5 z-40"
                                onClick={scrollToBottom}
                            >
                                {displayDownArrow()}
                            </span>
                        )}
                    </div>

                    {/* FOOTER */}
                    <div className="z-30">
                        {messageSelectionActive ? (
                            <Fragment>
                                <div className="flex items-center justify-between pl-[2.5rem] pr-[1.5rem] bg-main-gray h-20 z-30">
                                    <div className="flex gap-4">
                                        <Image
                                            alt="close-msg-selection"
                                            className="cursor-pointer"
                                            src={closeIcon}
                                            onClick={handleCloseMsgSelection}
                                        />
                                        <span>
                                            {selectedMessages.length} Selected
                                        </span>
                                    </div>
                                    <span
                                        className="cursor-pointer"
                                        onClick={handleDeleteMessages}
                                    >
                                        {displayBin()}
                                    </span>
                                </div>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <EmojiDrawer
                                    isDrawerOpen={isDrawerOpen}
                                    onEmojiSelect={handleEmojiSelect}
                                />
                                <div className="flex items-center px-4 gap-2 bg-main-gray h-20">
                                    <div className="flex justify-center gap-3 w-[10%]">
                                        <Image
                                            className="w-7 cursor-pointer"
                                            {...emojiIconProps}
                                        />
                                        <AttachDocument
                                            messageInputValue={
                                                messageInputValue
                                            }
                                            focusMessageInput={
                                                focusMessageInput
                                            }
                                            handleInputChange={
                                                handleInputChange
                                            }
                                            handleSendMessage={
                                                handleSendMessage
                                            }
                                            onEnterDown={onEnterDown}
                                        />
                                    </div>
                                    <Input
                                        id="send-message-input"
                                        classNameDiv="w-full"
                                        className="input bg-white focus:outline-none p-3"
                                        placeholder={
                                            dictionary.selectedChat
                                                .messageInputPlaceholder
                                        }
                                        ref={ref}
                                        value={messageInputValue}
                                        onKeyDown={onEnterDown}
                                        onChange={handleInputChange}
                                    />
                                    <div className="px-2">
                                        <Image
                                            className="w-8 cursor-pointer"
                                            {...sendArrowIconProps}
                                        />
                                    </div>
                                </div>
                            </Fragment>
                        )}
                    </div>
                </div>
            </div>
        );
    }
);

export default SelectedChat;
