import { Chat } from "./types";

export const BASE_URL = "https://mario.webmarc.cucuza.com";
export const isCurrentUser = (id: string, currentUser: string) =>
    id === currentUser;

export const ChatDefault = {
    id: "",
    createdAt: "",
    friendId: "",
    friend: {
        id: "",
        firstName: "",
        lastName: "",
        chat: [] as Chat[],
    },
    user: {
        id: "",
        firstName: "",
        lastName: "",
        chat: [] as Chat[],
    },
    messages: [{ createdAt: "", receiverId: "", senderId: "", text: "" }],
    userId: "",
};
