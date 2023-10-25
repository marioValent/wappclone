export type User = {
    id: string;
    firstName: string;
    lastName: string;
    chat: Chat[];
};
export type Message = {
    createdAt: string;
    receiverId: string;
    senderId: string;
    text: string;
};
export type Chat = {
    id: string;
    friend: User;
    friendId: string;
    messages: Message[];
    userId: string;
};
