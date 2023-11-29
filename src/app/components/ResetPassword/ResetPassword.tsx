"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import Input from "../shared/Input";
import Modal from "../shared/Modal";
import Button from "../shared/Button";
import schema from "./schema";
import visibilityIcon from "@/../public/visibilityIcon.svg";
import visibilityOffIcon from "@/../public/visibilityOffIcon.svg";
import { BASE_URL, dictionary } from "../../common";
import axios from "axios";

const ResetPassword = () => {
    const router = useRouter();
    const params = useSearchParams();
    const email = params.get("query");

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });
    const [formErrors, setFormErrors] = useState<z.ZodIssue[]>([]);
    const [showPassword, setShowPassword] = useState(false);
    const [showConPassword, setShowConPassword] = useState(false);

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

    const handleResetPassword = async () => {
        const response = await axios.post(
            `${BASE_URL}/api/user/reset-password`,
            {
                email: email,
                newPassword: formData.password,
            }
        );
        console.log("Response data: ", response.data);
    };

    const handleResetBtnClick = () => {
        try {
            schema.parse(formData);
            handleResetPassword();
            setFormErrors([]);
            router.push("/");
        } catch (error) {
            if (error instanceof z.ZodError) {
                setFormErrors(error.errors);
            } else {
                console.error(error);
            }
        }
    };

    return (
        <Modal titleText="Enter a new password" isResetPwModal={true}>
            <Input
                id="password"
                classNameDiv="mb-4"
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
                placeholder={dictionary.modal.passwordPlaceHolder}
                textLabel={dictionary.modal.passwordLabel}
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange}
            />
            <Input
                id="confirmPassword"
                classNameDiv="mb-5"
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
                    dictionary.modal.register.confirmPasswordPlaceholder
                }
                textLabel={dictionary.modal.register.confirmPasswordLabel}
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
                <Button variant="secondary" onClick={handleResetBtnClick}>
                    {dictionary.modal.resetPass.resetBtn}
                </Button>
            </div>
        </Modal>
    );
};

export default ResetPassword;
