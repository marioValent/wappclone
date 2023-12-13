import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Dropdown from "../../shared/Dropdown";
import myProfileIcon from "@/../public/myProfile.svg";
import { displayChatMenu, getNavbarData } from "./SelectedChat.utils";
import { Chat, User } from "@/app/common";

interface SelectedChatNavbarProps {
    data: Chat | User;
    currentUser: User | null;
    setMessageSelectionActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const SelectedChatNavbar: React.FC<SelectedChatNavbarProps> = ({
    data,
    currentUser,
    setMessageSelectionActive,
}) => {
    const navbarRef = useRef<HTMLDivElement | null>(null);
    const [isMenuDropdownOpen, setIsMenuDropdownOpen] = useState(false);

    const [dropdownTop, setDropDownTop] = useState(0);
    const [dropdownLeft, setDropdownLeft] = useState(0);

    const menuDropdownTop = (navbarRef.current?.clientHeight ?? 0) - 5;
    const menuDropdownLeft = (navbarRef.current?.clientWidth ?? 0) - 186;

    const handleDropdownToggle = () => {
        setIsMenuDropdownOpen(!isMenuDropdownOpen);
    };

    const handleSelectMsgsBtnClick = () => {
        setMessageSelectionActive(true);
        setIsMenuDropdownOpen(false);
    };

    useEffect(() => {
        setDropDownTop(menuDropdownTop);
    }, [menuDropdownTop]);
    useEffect(() => {
        setDropdownLeft(menuDropdownLeft);
    }, [menuDropdownLeft]);

    return (
        <div
            ref={navbarRef}
            className="flex justify-between items-center bg-main-gray border-l border-main-gray-deeper py-1 px-4 z-40"
        >
            <div className="flex justify-start items-center gap-2">
                <Image
                    src={myProfileIcon}
                    alt="profile icon"
                    style={{ width: "3rem", height: "3rem" }}
                />
                <h2>{getNavbarData(data, currentUser)}</h2>
            </div>
            <span
                className={`cursor-pointer rounded-full p-2 ${
                    isMenuDropdownOpen && "bg-app-gray-deeper"
                }`}
                onClick={handleDropdownToggle}
            >
                {displayChatMenu()}
            </span>
            {isMenuDropdownOpen && (
                <Dropdown
                    dropdownTop={dropdownTop}
                    dropdownLeft={dropdownLeft}
                    handleBtnClick={handleSelectMsgsBtnClick}
                >
                    Select messages
                </Dropdown>
            )}
        </div>
    );
};

export default SelectedChatNavbar;
