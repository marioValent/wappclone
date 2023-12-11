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
import { useCurrentUser, useSocket } from "@/app/hooks";
import closeIcon from "@/../public/closeIcon.svg";
import emojiIcon from "@/../public/emojiIcon.svg";
import keyboardVoiceIcon from "@/../public/keyboardVoiceIcon.svg";
import myProfileIcon from "@/../public/myProfile.svg";
import sendArrow from "@/../public/sendArrow.svg";
import {
    displayDate,
    getContentData,
    getNavbarData,
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

        // from MessageText - get isDropdownOpen value
        const [isDropdownOpen, setIsDropdownOpen] = useState(false);
        const [initialScrollPosition, setInitialScrollPosition] = useState(0);

        const getDropdownState = (isOpen: boolean) => {
            setIsDropdownOpen(isOpen);
        };
        // end

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = e.target;
            setMessageInputValue(value);
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

                    joinRoom(chatData.id);

                    socket.emit(
                        "send-message",
                        chatData.id,
                        chatData.userId,
                        chatData.friendId,
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

        useEffect(() => {
            //move scrollbar to bottom
            if (scrollRef.current) {
                scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
            }
        }, [isLoading, messageSent]);

        // code to block the scrollbar when dropdown is open
        useEffect(() => {
            if (isDropdownOpen && scrollRef.current) {
                setInitialScrollPosition(scrollRef.current.scrollTop);
            }
        }, [isDropdownOpen]);

        const handleScroll = () => {
            if (isDropdownOpen && scrollRef.current) {
                scrollRef.current.scrollTop = initialScrollPosition;
            }
        };
        // end

        if (isLoading) return <Spinner customClassName="h-5/6" />;

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
                        <h2>{getNavbarData(data, currentUser)}</h2>
                    </div>
                    <div
                        className="h-full grid overflow-auto scrollbar z-20"
                        ref={scrollRef}
                        onScroll={handleScroll}
                    >
                        {messages?.length > 0 ? (
                            <ol
                                id="message-list"
                                ref={msgListRef}
                                className="relative flex flex-col-reverse flex-grow px-10 py-4"
                            >
                                {messages.map((message, index) => (
                                    <Fragment key={message.id}>
                                        <MessageText
                                            data={data}
                                            message={message}
                                            isSender={
                                                message.senderId ===
                                                currentUser?.id
                                            }
                                            msgListRef={msgListRef}
                                            messages={messages}
                                            setMessages={setMessages}
                                            onDropdownToggle={getDropdownState}
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
                    </div>

                    <div className="z-30">
                        <EmojiDrawer
                            isDrawerOpen={isDrawerOpen}
                            onEmojiSelect={handleEmojiSelect}
                        />
                        <div className="flex items-center px-4 gap-2 bg-main-gray h-20">
                            <div className="flex justify-center gap-3 w-[10%]">
                                {isDrawerOpen ? (
                                    <Image
                                        alt="close-icon"
                                        src={closeIcon}
                                        className="w-7 cursor-pointer"
                                        onClick={closeEmojiDrawer}
                                    />
                                ) : (
                                    <Image
                                        alt="emoji-icon"
                                        src={emojiIcon}
                                        className="w-7 cursor-pointer"
                                        onClick={openEmojiDrawer}
                                    />
                                )}
                                <AttachDocument
                                    messageInputValue={messageInputValue}
                                    focusMessageInput={focusMessageInput}
                                    handleInputChange={handleInputChange}
                                    handleSendMessage={handleSendMessage}
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
                            {messageInputValue ? (
                                <Image
                                    alt="send-arrow-icon"
                                    className="w-8 cursor-pointer"
                                    src={sendArrow}
                                    onClick={handleSendMessage}
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
            </div>
        );
    }
);

export default SelectedChat;
