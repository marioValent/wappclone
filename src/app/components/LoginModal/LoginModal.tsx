"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { z } from "zod";
import schema from "./schema";
import Button from "../shared/Button";
import Input from "../shared/Input";
import Modal from "../shared/Modal";
import Spinner from "../shared/Spinner";
import visibilityIcon from "@/../public/visibilityIcon.svg";
import visibilityOffIcon from "@/../public/visibilityOffIcon.svg";
import { BASE_URL, dictionary, setToken } from "@/app/common";

interface LoginModalProps {
    isLoginModalOpen: boolean;
    setIsLoginModalOpen: (value: React.SetStateAction<boolean>) => void;
    setIsForgotPassModalOpen: (value: React.SetStateAction<boolean>) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
    isLoginModalOpen,
    setIsLoginModalOpen,
    setIsForgotPassModalOpen,
}: LoginModalProps) => {
    const router = useRouter();

    const [formData, setFormData] = useState({ email: "", password: "" });
    const [formErrors, setFormErrors] = useState<z.ZodIssue[]>([]);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const closeModal = () => {
        setIsLoginModalOpen(false);
        setFormErrors([]);
    };

    const openForgotPassModal = () => {
        setIsLoginModalOpen(false);
        setIsForgotPassModalOpen(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const clickIconHandler = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            schema.parse(formData);
            const response = await fetch(`${BASE_URL}/api/user/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                const responseData = await response.json();
                if (!responseData.token) return alert("The password is wrong");
                const token = responseData.token;
                setToken(token);
                setIsLoading(false);
                closeModal();
                router.push("/home");
            } else {
                console.error("API call failed:", response.status);
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                setFormErrors(error.issues);
            }
        }
    };

    return (
        <>
            {isLoginModalOpen && (
                <Modal
                    titleText={dictionary.modal.login.title}
                    closeModal={closeModal}
                >
                    {!formErrors && isLoading ? (
                        <Spinner customClassName="mb-16" />
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <Input
                                id="email"
                                classNameDiv="mb-4"
                                placeholder={dictionary.modal.emailPlaceholder}
                                textLabel={dictionary.modal.emailLabel}
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            <Input
                                id="password"
                                classNameDiv="mb-5"
                                iconRight={
                                    <Image
                                        src={
                                            showPassword
                                                ? visibilityOffIcon
                                                : visibilityIcon
                                        }
                                        alt="visibility password icon"
                                        className="cursor-pointer m-2 shrink-0"
                                        onClick={clickIconHandler}
                                    />
                                }
                                placeholder={
                                    dictionary.modal.passwordPlaceHolder
                                }
                                textLabel={dictionary.modal.passwordLabel}
                                type={showPassword ? "text" : "password"}
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                            {formErrors.length > 0 && (
                                <div className="text-red-600 mb-4">
                                    {formErrors.map((error, index) => (
                                        <p key={index}>{error.message}</p>
                                    ))}
                                </div>
                            )}
                            <div className="flex justify-center">
                                <Button variant="primary" type="submit">
                                    {dictionary.global.loginBtn}
                                </Button>
                            </div>
                            <span className="flex gap-1 justify-center text-xs p-2 mt-2">
                                <span>
                                    {dictionary.modal.login.resetPasswordMsg1}
                                </span>
                                <span
                                    className="font-medium text-blue-link cursor-pointer"
                                    onClick={openForgotPassModal}
                                >
                                    {dictionary.modal.login.resetPasswordMsg2}
                                </span>
                            </span>
                        </form>
                    )}
                </Modal>
            )}
        </>
    );
};

export default LoginModal;
