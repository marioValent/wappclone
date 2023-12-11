// @ts-nocheck

import http from "http";
import express from "express";
import socketIO from "socket.io";
import db from "../lib/db";

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(socket.client.conn.server.clientsCount + " users connected");
    socket.on("join-room", (room) => {
        console.log("room joined");
        socket.join(room);
    });

    socket.on("join-personal-room", (room) => {
        console.log(room);
        if (room) {
            console.log("personal-room joined", room);
            socket.join(room);
        }
    });

    socket.on("send-message", async (room, senderId, receiverId, text) => {
        try {
            console.log("sending message...", room);
            console.log(receiverId);

            if (senderId) {
                const newMessage = await db.message.create({
                    data: {
                        senderId,
                        receiverId,
                        text: text,
                        chatId: room,
                    },
                });

                io.to(room).emit("received-messages", newMessage);
                io.to(senderId).to(receiverId).emit("received-chat-list", []);

                console.log("message sent");
            }
        } catch (error) {
            console.error("Error sending message:", error);
        }
    });

    socket.on("delete-message", async (roomId, messageId) => {
        try {
            console.log("deleting message...", roomId, messageId);

            await db.message.delete({
                where: {
                    id: messageId,
                },
            });

            io.to(roomId).emit("message-deleted", messageId);

            console.log("message deleted");
        } catch (error) {
            console.error("Error deleting message:", error);
        }
    });
});

server.listen(4000, () => {
    console.log("Server is running on http://localhost:4000");
});
