import { Chat } from "./types";

export const BASE_URL = "https://mario.webmarc.cucuza.com";

export const ChatDefault = {
    id: "",
    friendId: "",
    friend: {
        firstName: "",
        lastName: "",
        chat: [] as Chat[],
    },
    messages: [{ text: "" }],
};
