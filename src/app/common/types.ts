export type User = {
    id: string;
    firstName: string;
    lastName: string;
    chat: Chat[];
    chatFriend: Chat[];
};
export type Message = {
    createdAt: string;
    receiverId: string;
    senderId: string;
    text: string;
};
export type Chat = {
    id: string;
    user: User;
    friend: User;
    friendId: string;
    messages: Message[];
    userId: string;
};
