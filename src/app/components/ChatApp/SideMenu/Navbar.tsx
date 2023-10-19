import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "@/app/components/shared/Button";
import addConvIcon from "@/../public/addConv.svg";
import logoutIcon from "@/../public/logoutIcon.svg";
import myProfileIcon from "@/../public/myProfile.svg";
import { deleteToken } from "@/app/common";

interface NavBarProps {
    openDrawer: () => void;
}

const Navbar = ({ openDrawer }: NavBarProps) => {
    const router = useRouter();

    const logout = () => {
        deleteToken();
        router.push("/");
    };

    return (
        <div className="flex justify-between bg-main-gray p-1">
            <Image
                alt="profile icon"
                src={myProfileIcon}
                style={{ width: "3rem", height: "3rem" }}
                title="My profile"
            />
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
