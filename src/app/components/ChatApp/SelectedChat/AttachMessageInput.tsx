import React, { useEffect, useRef, useState } from "react";
import Input from "../../shared/Input";
import { dictionary } from "@/app/common";

interface AttachMessageInputProps {
    messageInputValue: string;
    selectedFile: File | null;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onEnterDown: (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => Promise<void>;
}

const AttachMessageInput: React.FC<AttachMessageInputProps> = ({
    messageInputValue,
    selectedFile,
    handleInputChange,
    onEnterDown,
}) => {
    const attachMessageRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (selectedFile) {
            attachMessageRef.current?.focus();
        }
    }, [selectedFile]);
    return (
        <Input
            id="attach-send-message-input"
            className="input bg-white focus:outline-none p-3"
            classNameDiv="w-full"
            placeholder={dictionary.selectedChat.messageInputPlaceholder}
            ref={attachMessageRef}
            value={messageInputValue}
            onChange={handleInputChange}
            onKeyDown={onEnterDown}
        />
    );
};

export default AttachMessageInput;
