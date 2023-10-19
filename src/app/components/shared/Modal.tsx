import React, { ReactNode } from "react";
import Image from "next/image";
import Button from "./Button";
import closeIcon from "@/../public/closeIcon.svg";

interface ModalProps {
    children: ReactNode;
    titleText: string;
    closeModal: () => void;
}

const Modal = ({ children, titleText, closeModal }: ModalProps) => {
    return (
        <div className="modal-display">
            <div className="modal">
                <div className="flex items-start justify-between">
                    <h2 className="text-lg font-semibold mt-12 mb-6">
                        {titleText}
                    </h2>
                    <Button isIcon type="button" onClick={closeModal}>
                        <Image src={closeIcon} alt="close icon" />
                    </Button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;
