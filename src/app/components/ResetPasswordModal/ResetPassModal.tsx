import React, { useState } from "react";
import Button from "../shared/Button";
import Input from "../shared/Input";
import Modal from "../shared/Modal";
import { dictionary } from "@/app/common";

interface ResetPassModalProps {
    isResetPassModalOpen: boolean;
    setIsResetPassModalOpen: (value: React.SetStateAction<boolean>) => void;
}

const ResetPassModal: React.FC<ResetPassModalProps> = ({
    isResetPassModalOpen,
    setIsResetPassModalOpen,
}) => {
    const [email, setEmail] = useState("");

    const [isInfoMsgVisible, setIsInfoMsgVisible] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(true);

    const closeModal = () => {
        setIsResetPassModalOpen(false);
        setIsInfoMsgVisible(false);
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

    const handleResetBtnClick = () => {
        if (isValidEmail(email)) {
            setIsInfoMsgVisible(true);
        } else {
            setIsEmailValid(false);
        }
    };

    return (
        <>
            {isResetPassModalOpen && (
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
                            classNameDiv="mb-4"
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

export default ResetPassModal;
