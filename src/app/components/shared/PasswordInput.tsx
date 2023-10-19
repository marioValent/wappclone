import React from "react";
import Image from "next/image";
import InputWithIcon from "./InputWithIcon";
import visibilityIcon from "@/../public/visibilityIcon.svg";
import visibilityOffIcon from "@/../public/visibilityOffIcon.svg";
import { dictionary } from "@/app/common";

interface PasswordInputProps {
    id?: string;
    classNameDiv?: string;
    placeholder?: string;
    textLabel?: string;
    value: string;
    showPassword: boolean;
    togglePasswordVisibility: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
    id = "password",
    classNameDiv = "mb-6",
    placeholder = dictionary.modal.passwordPlaceHolder,
    showPassword,
    value,
    textLabel = "Password",
    togglePasswordVisibility,
    onChange,
}: PasswordInputProps) => {
    return (
        <InputWithIcon
            id={id}
            type={showPassword ? "text" : "password"}
            classNameDiv={classNameDiv}
            placeholder={placeholder}
            textLabel={textLabel}
            value={value}
            onChange={onChange}
            togglePasswordVisibility={togglePasswordVisibility}
        >
            {showPassword ? (
                <Image src={visibilityOffIcon} alt="visibility-off-icon" />
            ) : (
                <Image src={visibilityIcon} alt="visibility-icon" />
            )}
        </InputWithIcon>
    );
};

export default PasswordInput;
