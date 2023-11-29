import React, { useState } from "react";
import axios from "axios";
import Button from "../shared/Button";
import Input from "../shared/Input";
import Modal from "../shared/Modal";
import { BASE_URL, dictionary } from "@/app/common";

interface ForgotPasswordModalProps {
    isForgotPassModalOpen: boolean;
    setIsForgotPassModalOpen: (value: React.SetStateAction<boolean>) => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
    isForgotPassModalOpen,
    setIsForgotPassModalOpen,
}) => {
    const [email, setEmail] = useState("");

    const [isInfoMsgVisible, setIsInfoMsgVisible] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(true);

    const closeModal = () => {
        setIsForgotPassModalOpen(false);
        setIsInfoMsgVisible(false);
        setEmail("");
        setIsEmailValid(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setEmail(value);
        setIsEmailValid(true);
    };

    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const sendEmail = async () => {
        try {
            const response = await axios.post(
                `${BASE_URL}/api/email-reset-password`,
                { to: email },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log("Response data: ", response.data);
        } catch (err) {
            console.log("err: ", err);
        }
    };

    const handleResetBtnClick = () => {
        if (isValidEmail(email)) {
            setIsInfoMsgVisible(true);
            sendEmail();
        } else {
            setIsEmailValid(false);
        }
    };

    return (
        <>
            {isForgotPassModalOpen && (
                <Modal
                    titleText={dictionary.modal.resetPass.title}
                    closeModal={closeModal}
                >
                    <>
                        {isInfoMsgVisible && (
                            <p className="text-center text-dark-green mb-4">
                                {dictionary.modal.resetPass.infoMsg}
                            </p>
                        )}

                        <Input
                            id="email"
                            classNameDiv="mb-6"
                            placeholder={dictionary.modal.emailPlaceholder}
                            textLabel={dictionary.modal.emailLabel}
                            type="email"
                            value={email}
                            onChange={handleInputChange}
                        />

                        {!isEmailValid && (
                            <p className="text-red-600 mb-4">
                                Please enter a valid email
                            </p>
                        )}

                        <div className="flex justify-center">
                            <Button
                                variant="secondary"
                                onClick={handleResetBtnClick}
                            >
                                {dictionary.modal.resetPass.resetBtn}
                            </Button>
                        </div>
                    </>
                </Modal>
            )}
        </>
    );
};

export default ForgotPasswordModal;
