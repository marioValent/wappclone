"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "./components/shared/Button";
// import InternetErrorPage from "./InternetErrorPage";
import LoginModal from "./components/LoginModal/LoginModal";
import RegisterModal from "./components/RegisterModal/RegisterModal";
import Spinner from "./components/shared/Spinner";
import loginIcon from "@/../public/loginIcon.svg";
import registerIcon from "@/../public/registerIcon.svg";
import logo from "@/../public/WhatsApp.svg.webp";
import { dictionary, getToken } from "./common";

const LoginPage = () => {
    const router = useRouter();
    const token = getToken();

    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const openLoginModal = () => {
        setIsLoginModalOpen(true);
    };
    const openRegisterModal = () => {
        setIsRegisterModalOpen(true);
    };

    useEffect(() => {
        if (token) {
            router.push("/home");
        }
        setIsLoading(false);
        return;
    }, []);

    if (isLoading) return <Spinner />;
    // const [isOnline, setOnline] = useState(true);
    // useEffect(() => {
    //     setOnline(navigator.onLine);
    // }, []);
    // window.addEventListener("online", () => {
    //     setOnline(true);
    // });
    // window.addEventListener("offline", () => {
    //     setOnline(false);
    // });
    // return isOnline ? (
    if (!token)
        return (
            <>
                <Image src={logo} alt="logo image" />
                <div className="flex flex-col space-y-20">
                    <h1 className="text-4xl font-bold mb-4">
                        {dictionary.loginPage.title}
                    </h1>
                    <p className="text-lg mb-6">
                        {dictionary.loginPage.subtitle}
                    </p>
                    <div className="flex gap-4">
                        <Button type="button" onClick={openLoginModal}>
                            {dictionary.global.loginBtn}
                            <Image src={loginIcon} alt="login icon" />
                        </Button>
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={openRegisterModal}
                        >
                            {dictionary.global.registerBtn}
                            <Image src={registerIcon} alt="register icon" />
                        </Button>
                        <LoginModal
                            isLoginModalOpen={isLoginModalOpen}
                            setIsLoginModalOpen={setIsLoginModalOpen}
                        />
                        <RegisterModal
                            isRegisterModalOpen={isRegisterModalOpen}
                            setIsRegisterModalOpen={setIsRegisterModalOpen}
                        />
                    </div>
                </div>
            </>
        );
    // : (
    //     <div className="flex items-center justify-center h-screen">
    //         <InternetErrorPage />
    //     </div>
    // );
};

export default LoginPage;
