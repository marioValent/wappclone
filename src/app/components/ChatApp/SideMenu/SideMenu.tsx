import React, { useState } from "react";
import ContentList from "./ContentList";
import Drawer from "../../shared/Drawer";
import Navbar from "./Navbar";
import SearchBar from "../../shared/SearchBar";
import { useUsers } from "@/app/hooks";
import { Chat, User, getToken } from "@/app/common";

interface SideMenuProps {
    onSelect: (chat: Chat) => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ onSelect }) => {
    const token = getToken();
    const [createConv, setCreateConv] = useState({ userId: "", friendId: "" });
    const users = useUsers();
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [searchedDrawerUsers, setSearchedDrawerUsers] = useState(Array<User>);
    const [searchedChatListUsers, setSearchedChatListUsers] = useState(
        Array<User>
    );
    const [searchedChats, setSearchedChats] = useState(Array<Chat>);

    const openDrawer = () => {
        setDrawerOpen(true);
    };

    const searchedChatsData = (listOfChats: Array<Chat>) => {
        setSearchedChats(listOfChats);
    };

    const searchedChatListUsersData = (listOfUsers: Array<User>) => {
        setSearchedChatListUsers(listOfUsers);
    };

    const searchedDrawerData = (listOfUsers: Array<User>) => {
        setSearchedDrawerUsers(listOfUsers);
    };

    const closeDrawer = () => {
        setDrawerOpen(false);
    };

    return (
        <div className="relative h-full overflow-hidden">
            <Navbar openDrawer={openDrawer} />
            <Drawer
                closeModal={closeDrawer}
                isDrawerOpen={isDrawerOpen}
                titleText="New Chat"
            >
                <SearchBar
                    id="drawer"
                    query="user"
                    isDrawerOpen={isDrawerOpen}
                    handleSearchUsers={searchedDrawerData}
                />
                <ContentList
                    id="drawer"
                    title="CONTACTS ON WAPPCLONE"
                    searchedUsers={searchedDrawerUsers}
                    users={users}
                    onSelect={onSelect}
                />
            </Drawer>
            <SearchBar
                id="chat-list"
                query="chat"
                handleSearchUsers={searchedChatListUsersData}
                handleSearchChats={searchedChatsData}
            />
            <ContentList
                id="chat-list"
                isMain
                title="CONTACTS"
                searchedChats={searchedChats}
                searchedUsers={searchedChatListUsers}
                users={users}
                onSelect={onSelect}
            />
        </div>
    );
};

export default SideMenu;
