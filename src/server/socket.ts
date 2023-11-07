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
    socket.on("join-room", (room) => {
        console.log("room joined");
        socket.join(room);
    });

    socket.on("send-message", async (room, senderId, receiverId, text) => {
        console.log("sending message...");

        await db.message.create({
            data: {
                senderId,
                receiverId,
                text: text,
                chatId: room,
            },
        });

        const messages = await db.message.findMany({
            where: { chatId: room },
        });

        io.to(room).emit("received-messages", messages.reverse());

        console.log("message sent");
    });
});

server.listen(4000, () => {
    console.log("Server is running on http://localhost:4000");
});
