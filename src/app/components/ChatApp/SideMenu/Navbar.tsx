import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "@/app/components/shared/Button";
import addConvIcon from "@/../public/addConv.svg";
import logoutIcon from "@/../public/logoutIcon.svg";
import myProfileIcon from "@/../public/myProfile.svg";
import { deleteToken } from "@/app/common";
import { useCurrentUser } from "@/app/hooks";

interface NavBarProps {
    openDrawer: () => void;
}

const Navbar = ({ openDrawer }: NavBarProps) => {
    const router = useRouter();
    const { currentUser } = useCurrentUser();

    const logout = () => {
        deleteToken();
        router.push("/");
    };

    return (
        <div className="flex justify-between bg-main-gray px-2 py-1">
            <div className="flex gap-2 items-center">
                <Image
                    alt="profile icon"
                    src={myProfileIcon}
                    style={{ width: "3rem", height: "3rem" }}
                    title="My profile"
                />
                <h4>
                    {currentUser?.firstName} {currentUser?.lastName}
                </h4>
            </div>
            <div className="flex items-center gap-3">
                <Button isIcon onClick={openDrawer} title="New chat">
                    <Image src={addConvIcon} alt="add conversation icon" />
                </Button>
                <Button isIcon onClick={logout} title="Logout">
                    <Image src={logoutIcon} alt="logout icon" />
                </Button>
            </div>
        </div>
    );
};

export default Navbar;
