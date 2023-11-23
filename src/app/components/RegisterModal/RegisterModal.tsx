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

interface RegisterModalProps {
    isRegisterModalOpen: boolean;
    setIsRegisterModalOpen: (value: React.SetStateAction<boolean>) => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({
    isRegisterModalOpen,
    setIsRegisterModalOpen,
}: RegisterModalProps) => {
    const router = useRouter();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });
    const [formErrors, setFormErrors] = useState<z.ZodIssue[]>([]);
    const [showPassword, setShowPassword] = useState(false);
    const [showConPassword, setShowConPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const closeModal = () => {
        setIsRegisterModalOpen(false);
        setFormErrors([]);
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
    const clickIconConHandler = () => {
        setShowConPassword(!showConPassword);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            schema.parse(formData);
            const { confirmPassword, ...rest } = formData;
            const response = await fetch(`${BASE_URL}/api/user/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(rest),
            });
            if (response.ok) {
                const responseData = await response.json();
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
            {isRegisterModalOpen && (
                <Modal
                    titleText={dictionary.modal.register.title}
                    closeModal={closeModal}
                >
                    {isLoading ? (
                        <Spinner customClassName="mb-16" />
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <Input
                                id="firstName"
                                classNameDiv="mb-2"
                                placeholder={
                                    dictionary.modal.register
                                        .firstnamePlaceholder
                                }
                                textLabel={
                                    dictionary.modal.register.firstnameLabel
                                }
                                value={formData.firstName}
                                onChange={handleInputChange}
                            />
                            <Input
                                id="lastName"
                                classNameDiv="mb-2"
                                placeholder={
                                    dictionary.modal.register
                                        .lastnamePlaceholder
                                }
                                textLabel={
                                    dictionary.modal.register.lastnameLabel
                                }
                                value={formData.lastName}
                                onChange={handleInputChange}
                            />
                            <Input
                                id="phone"
                                classNameDiv="mb-2"
                                placeholder={
                                    dictionary.modal.register.phonePlaceholder
                                }
                                textLabel={dictionary.modal.register.phoneLabel}
                                type="tel"
                                value={formData.phone}
                                onChange={handleInputChange}
                            />
                            <Input
                                id="email"
                                classNameDiv="mb-2"
                                placeholder={dictionary.modal.emailPlaceholder}
                                textLabel={dictionary.modal.emailLabel}
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            <Input
                                id="password"
                                classNameDiv="mb-2"
                                iconRight={
                                    showPassword ? (
                                        <Image
                                            src={visibilityOffIcon}
                                            alt="visibility-off-icon"
                                            className="cursor-pointer m-2 shrink-0"
                                            onClick={clickIconHandler}
                                        />
                                    ) : (
                                        <Image
                                            src={visibilityIcon}
                                            alt="visibility-icon"
                                            className="cursor-pointer m-2 shrink-0"
                                            onClick={clickIconHandler}
                                        />
                                    )
                                }
                                placeholder={
                                    dictionary.modal.passwordPlaceHolder
                                }
                                textLabel={dictionary.modal.passwordLabel}
                                type={showPassword ? "text" : "password"}
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                            <Input
                                id="confirmPassword"
                                classNameDiv="mb-2"
                                iconRight={
                                    showConPassword ? (
                                        <Image
                                            src={visibilityOffIcon}
                                            alt="visibility-off-icon"
                                            className="cursor-pointer m-2 shrink-0"
                                            onClick={clickIconConHandler}
                                        />
                                    ) : (
                                        <Image
                                            src={visibilityIcon}
                                            alt="visibility-icon"
                                            className="cursor-pointer m-2 shrink-0"
                                            onClick={clickIconConHandler}
                                        />
                                    )
                                }
                                placeholder={
                                    dictionary.modal.register
                                        .confirmPasswordPlaceholder
                                }
                                textLabel={
                                    dictionary.modal.register
                                        .confirmPasswordLabel
                                }
                                type={showConPassword ? "text" : "password"}
                                value={formData.confirmPassword}
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
                                    {dictionary.global.registerBtn}
                                </Button>
                            </div>
                        </form>
                    )}
                </Modal>
            )}
        </>
    );
};

export default RegisterModal;
