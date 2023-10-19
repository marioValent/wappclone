import React, { useState } from "react";
import Navbar from "./Navbar";
import { Chat, User, getToken } from "@/app/common";
import Drawer from "../../shared/Drawer";
import DrawerUsersList from "./AddConversationDrawer/DrawerUsersList";
import ChatList from "./ChatList";
import { useUsers } from "@/app/hooks";
import SearchBar from "../../shared/SearchBar";

interface SideMenuProps {
    onSelect: (chat: Chat) => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ onSelect }) => {
    const token = getToken();
    const [createConv, setCreateConv] = useState({ userId: "", friendId: "" });
    const users = useUsers();
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [searchedUsers, setSearchedUsers] = useState(Array<User>);
    const [searchedListUsers, setSearchedListUsers] = useState(Array<User>);
    const [searchedChats, setSearchedChats] = useState(Array<Chat>);

    const openDrawer = () => {
        setDrawerOpen(true);
    };

    const searchedChatsData = (listOfChats: Array<Chat>) => {
        setSearchedChats(listOfChats);
    };

    const searchedUserListData = (listOfUsers: Array<User>) => {
        setSearchedListUsers(listOfUsers);
    };

    const searchedDrawerData = (listOfUsers: Array<User>) => {
        setSearchedUsers(listOfUsers);
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
                <DrawerUsersList
                    searchedUsers={searchedUsers}
                    users={users}
                    onSelect={onSelect}
                />
            </Drawer>
            <SearchBar
                id="chat-list"
                query="chat"
                handleSearchUsers={searchedUserListData}
                handleSearchChats={searchedChatsData}
            />
            <ChatList
                searchedChats={searchedChats}
                searchedUsers={searchedListUsers}
                users={users}
                onSelect={onSelect}
            />
        </div>
    );
};

export default SideMenu;
