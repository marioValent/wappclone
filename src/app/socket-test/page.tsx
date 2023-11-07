"use client";

import socketIOClient from "socket.io-client";
import { useEffect, useState } from "react";
import useCurrentUser from "../hooks/useCurrentUser";

const chatId = "clo4f8ryc0003qv2s1evxn3xb";
const currentUserId = "clnsl5ojp0000pubwtsjzwoca";
const friendId = "clny81zs10000qvvpsg4ehc2r";

const SocketTest = () => {
    const [messages, setMessages] = useState<any>([]);
    const currentUser = useCurrentUser();
    const socket = socketIOClient("https://mario-ws.webmarc.cucuza.com/");

    useEffect(() => {
        socket.on("connect", joinRoom);

        socket.on("received-messages", (messages) => {
            console.log("messages", messages);
            setMessages(messages);
        });

        return () => {
            socket.off("connect", joinRoom);
            socket.disconnect();
        };
    }, [socket]);

    const joinRoom = () => {
        socket.emit(
            "join-room",
            currentUser?.id === currentUserId || currentUser?.id === friendId
                ? chatId
                : "another-room"
        );
    };

    const sendMessage = () => {
        socket.emit(
            "send-message",
            currentUser?.id === currentUserId || currentUser?.id === friendId
                ? chatId
                : "another-room",
            currentUser?.id,
            "clny81zs10000qvvpsg4ehc2r",
            "socket.io test message2"
        );
    };

    return (
        <div className="flex flex-col items-center gap-y-4">
            this is the socket-test page
            {messages.length > 0
                ? messages.map((x: any, index: number) => (
                      <p key={index}>{x.text}</p>
                  ))
                : null}
            <button onClick={sendMessage}>Send message</button>
        </div>
    );
};

export default SocketTest;
