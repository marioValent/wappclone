import React, { useEffect, useRef, forwardRef, useState } from "react";
import axios from "axios";
import searchIcon from "@/../public/searchIcon.svg";
import arrowBack from "@/../public/arrowBack.svg";
import { BASE_URL, Chat, User, dictionary } from "@/app/common";
import Image from "next/image";
import Input from "@/app/components/shared/Input";

interface SearchBarProps {
    id: string;
    isDrawerOpen?: boolean;
    query: string;
    handleSearchChats?: (chats: Array<Chat>) => void;
    handleSearchUsers: (users: Array<User>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
    id,
    isDrawerOpen,
    query,
    handleSearchChats,
    handleSearchUsers,
}) => {
    const [pinCode, setPinCode] = useState("");
    const [isSearchIcon, setIsSearchIcon] = useState(true);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const clickSearchIcon = () => {
        searchInputRef.current?.focus();
        setIsSearchIcon(false);
    };

    const clickArrowBackIcon = () => {
        searchInputRef.current?.blur();
        setPinCode("");
        setIsSearchIcon(true);
    };

    const handleIconOnMouseDown = (
        event: React.MouseEvent<HTMLImageElement, MouseEvent>
    ) => {
        event.preventDefault();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsSearchIcon(false);
        setPinCode(e.target.value);
    };

    const handleInputOnBlur = () => {
        if (pinCode === "") {
            setIsSearchIcon(true);
        }
    };

    const handleInputOnFocus = () => {
        setIsSearchIcon(false);
    };

    useEffect(() => {
        const getData = setTimeout(() => {
            axios
                .get(`${BASE_URL}/api/${query}/search?query=${pinCode}`)
                .then((response) => {
                    handleSearchChats && handleSearchChats(response.data.chats);
                    handleSearchUsers(response.data.users);
                });
        }, 500);

        return () => clearTimeout(getData);
    }, [pinCode]);

    useEffect(() => {
        setPinCode("");
        searchInputRef.current?.focus();
    }, [isDrawerOpen]);

    return (
        <Input
            id={`search-bar-${id}`}
            classNameDiv="my-2 mx-6"
            iconLeft={
                <Image
                    alt="search-icon"
                    className="cursor-pointer m-2 shrink-0"
                    src={isSearchIcon ? searchIcon : arrowBack}
                    onClick={
                        isSearchIcon ? clickSearchIcon : clickArrowBackIcon
                    }
                    onMouseDown={handleIconOnMouseDown}
                />
            }
            placeholder={dictionary.sideMenu.searchBarPlaceholder}
            ref={searchInputRef}
            type="text"
            value={pinCode}
            onChange={handleInputChange}
            onFocus={handleInputOnFocus}
            onBlur={handleInputOnBlur}
        />
    );
};

export default SearchBar;
