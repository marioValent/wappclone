import { Chat, MetaParser } from "./types";

export const BASE_URL = "http://localhost:3000/";
export const isCurrentUser = (id: string | undefined, currentUser: string) =>
    id === currentUser;

export const ChatDefault: Chat = {
    id: "",
    createdAt: "",
    friendId: "",
    friend: {
        id: "",
        firstName: "",
        lastName: "",
        chat: [] as Chat[],
        chatFriend: [] as Chat[],
    },
    user: {
        id: "",
        firstName: "",
        lastName: "",
        chat: [] as Chat[],
        chatFriend: [] as Chat[],
    },
    messages: [
        { id: "", createdAt: "", receiverId: "", senderId: "", text: "" },
    ],
    userId: "",
};

export const MetaParserDefault: MetaParser = {
    title: "",
    description: "",
    imageUrl: "",
};
