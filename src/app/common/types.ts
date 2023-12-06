export type User = {
    id: string;
    firstName: string;
    lastName: string;
    chat: Chat[];
    chatFriend: Chat[];
};
export type Message = {
    id: string;
    createdAt: string;
    receiverId: string;
    senderId: string;
    text: string;
};
export type Chat = {
    createdAt: string;
    id: string;
    user: User;
    friend: User;
    friendId: string;
    messages: Message[];
    userId: string;
};

export type MetaParser = {
    title: string | undefined;
    description: string | undefined;
    imageUrl: string | undefined;
};
