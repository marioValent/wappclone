import React, { useState } from "react";
import ContentList from "./ContentList";
import Drawer from "../../shared/Drawer";
import Navbar from "./Navbar";
import SearchBar from "../../shared/SearchBar";
import { Chat, User } from "@/app/common";

interface SideMenuProps {
    onSelect: (data: Chat | User) => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ onSelect }) => {
    const [createConv, setCreateConv] = useState({ userId: "", friendId: "" });
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [searchedDrawerUsers, setSearchedDrawerUsers] =
        useState<Array<User> | null>();
    const [searchedChatListUsers, setSearchedChatListUsers] =
        useState<Array<User> | null>();
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
                    isMain={false}
                    searchedUsers={searchedDrawerUsers}
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
                title="CONTACTS"
                searchedChats={searchedChats}
                searchedUsers={searchedChatListUsers}
                onSelect={onSelect}
            />
        </div>
    );
};

export default SideMenu;
