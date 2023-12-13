import { Chat, ChatDefault, Message, User } from "@/app/common";
import { formatDay } from "@/app/common/dateHelpers";

export const displayChatMenu = () => {
    return (
        <svg
            viewBox="0 0 24 24"
            height="24"
            width="24"
            preserveAspectRatio="xMidYMid meet"
            className="shrink-0"
            version="1.1"
            x="0px"
            y="0px"
        >
            <title>menu</title>
            <path
                fill="currentColor"
                d="M12,7c1.104,0,2-0.896,2-2c0-1.105-0.895-2-2-2c-1.104,0-2,0.894-2,2 C10,6.105,10.895,7,12,7z M12,9c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,9.895,13.104,9,12,9z M12,15 c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,15.894,13.104,15,12,15z"
            ></path>
        </svg>
    );
};

export const displayBin = () => {
    return (
        <svg
            viewBox="0 0 24 24"
            height="24"
            width="24"
            preserveAspectRatio="xMidYMid meet"
            className="shrink-0"
            version="1.1"
            x="0px"
            y="0px"
        >
            <title>delete</title>
            <path
                fill="currentColor"
                d="M6,18c0,1.1,0.9,2,2,2h8c1.1,0,2-0.9,2-2V6H6V18z M19,3h-3.5l-1-1h-5l-1,1H5v2h14V3z"
            ></path>
        </svg>
    );
};

export const displayTailInSvg = () => {
    return (
        <svg
            viewBox="0 0 8 13"
            height="13"
            width="8"
            preserveAspectRatio="xMidYMid meet"
            className="shrink-0"
            version="1.1"
            x="0px"
            y="0px"
        >
            <path
                fill="#fff"
                d="M1.533,3.568L8,12.193V1H2.812 C1.042,1,0.474,2.156,1.533,3.568z"
            ></path>
            <path
                fill="#fff"
                d="M1.533,2.568L8,11.193V0L2.812,0C1.042,0,0.474,1.156,1.533,2.568z"
            ></path>
        </svg>
    );
};

export const displayTailOutSvg = () => {
    return (
        <svg
            viewBox="0 0 8 13"
            height="13"
            width="8"
            preserveAspectRatio="xMidYMid meet"
            className="shrink-0"
            version="1.1"
            x="0px"
            y="0px"
        >
            <path
                fill="#d9fdd3"
                d="M5.188,1H0v11.193l6.467-8.625 C7.526,2.156,6.958,1,5.188,1z"
            ></path>
            <path
                fill="#d9fdd3"
                d="M5.188,0H0v11.193l6.467-8.625C7.526,1.156,6.958,0,5.188,0z"
            ></path>
        </svg>
    );
};

export const displayDropDownArrow = () => {
    return (
        <svg
            viewBox="0 0 18 18"
            height="18"
            width="18"
            preserveAspectRatio="xMidYMid meet"
            className="shrink-0"
            version="1.1"
            x="0px"
            y="0px"
        >
            <path
                fill="#8696a0"
                d="M3.3,4.6L9,10.3l5.7-5.7l1.6,1.6L9,13.4L1.7,6.2L3.3,4.6z"
            ></path>
        </svg>
    );
};

export const displayDate = (
    index: number,
    nextIndex: number,
    array: Message[]
): boolean => {
    if (
        index === array.length - 1 ||
        formatDay(array[index].createdAt) !==
            formatDay(array[nextIndex].createdAt)
    ) {
        return true;
    }

    return false;
};

const isUser = (data: Chat | User): data is User => {
    return (data as User).firstName !== undefined;
};

const isChat = (data: Chat | User): data is Chat => {
    return (data as Chat).friend !== undefined;
};

export const getNavbarData = (data: Chat | User, currentUser: User | null) => {
    if (isUser(data)) {
        return `${data.firstName} ${data.lastName}`;
    } else if (isChat(data)) {
        return currentUser?.id === data.userId
            ? `${data.friend.firstName} ${data.friend.lastName}`
            : `${data.user.firstName} ${data.user.lastName}`;
    }
    return;
};

export const getContentData = (data: Chat | User): Chat => {
    if (isUser(data)) {
        return data.chat[0];
    } else if (isChat(data)) {
        return data;
    }
    return ChatDefault;
};
