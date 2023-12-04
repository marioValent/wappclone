"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { z } from "zod";
import Button from "../shared/Button";
import Input from "../shared/Input";
import Modal from "../shared/Modal";
import Spinner from "../shared/Spinner";
import schema from "./schema";
import visibilityIcon from "@/../public/visibilityIcon.svg";
import visibilityOffIcon from "@/../public/visibilityOffIcon.svg";
import { BASE_URL, dictionary } from "../../common";

const ResetPassword = () => {
    const router = useRouter();
    const params = useSearchParams();
    const email = params.get("query");
    const queryToken = params.get("token");

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });
    const [formErrors, setFormErrors] = useState<z.ZodIssue[]>([]);
    const [showPassword, setShowPassword] = useState(false);
    const [showConPassword, setShowConPassword] = useState(false);

    const [countdown, setCountdown] = useState(10);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [responseReceived, setResponseReceived] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

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

    const startCountdown = () => {
        const id = setInterval(() => {
            setCountdown((prevCount) => prevCount - 1);
        }, 1000);

        setIntervalId(id);

        setTimeout(() => {
            clearInterval(id);
            setIsLoading(true);
            router.push("/");
        }, countdown * 1000);
    };

    const handleResetPassword = async () => {
        const response = await axios.post(
            `${BASE_URL}/api/user/reset-password`,
            {
                email: email,
                token: queryToken,
                newPassword: formData.password,
            }
        );
        setResponseReceived(true);

        if (response.data.error === "TokenExpiredError") {
            setErrorMessage(response.data.message);
        }
        console.log("Response data: ", response.data);
    };

    const handleResetBtnClick = () => {
        try {
            schema.parse(formData);
            setFormErrors([]);
            startCountdown();
            handleResetPassword();
        } catch (error) {
            if (error instanceof z.ZodError) {
                setFormErrors(error.errors);
            } else {
                console.error(error);
            }
        }
    };

    const onEnterDown = async (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key === "Enter") handleResetBtnClick();
    };

    useEffect(() => {
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [intervalId]);

    if (isLoading) return <Spinner customClassName="mb-16" />;

    return (
        <>
            {intervalId && countdown > 0 ? (
                <div>
                    {responseReceived && (
                        <>
                            <h1
                                className={`text-lg font-medium ${
                                    errorMessage && "text-red-600"
                                }`}
                            >
                                {errorMessage
                                    ? errorMessage
                                    : "Password reset successfully."}{" "}
                                You will be redirected to the login page in{" "}
                                {countdown} seconds.
                            </h1>

                            <div className="flex justify-center mt-4">
                                <Button
                                    variant="secondary"
                                    onClick={() => router.push("/")}
                                >
                                    {dictionary.modal.resetPass.jumpBtn}
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            ) : (
                <Modal
                    titleText="Enter a new password"
                    isResetPasswordPage={true}
                >
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
                        textLabel={
                            dictionary.modal.register.confirmPasswordLabel
                        }
                        type={showConPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        onKeyDown={onEnterDown}
                    />
                    {formErrors.length > 0 && (
                        <div className="text-red-600 mb-4">
                            {formErrors.map((error, index) => (
                                <p key={index}>{error.message}</p>
                            ))}
                        </div>
                    )}
                    <div className="flex justify-center">
                        <Button
                            variant="secondary"
                            onClick={handleResetBtnClick}
                        >
                            {dictionary.modal.resetPass.resetBtn}
                        </Button>
                    </div>
                </Modal>
            )}
        </>
    );
};

export default ResetPassword;
