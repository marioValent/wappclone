export type User = {
    id: string;
    firstName: string;
    lastName: string;
    chat: Chat[];
};
export type Message = { text: string };
export type Chat = {
    id: string;
    friendId: string;
    friend: User;
    messages: Message[];
};
