import React, { ReactNode, InputHTMLAttributes } from "react";

interface InputWithIconProps extends InputHTMLAttributes<HTMLInputElement> {
    classNameDiv: string;
    textLabel: string;
    name?: string;
    type?: string;
    value: string;
    togglePasswordVisibility: () => void;
    children?: ReactNode;
}

const InputWithIcon: React.FC<InputWithIconProps> = ({
    id,
    className,
    classNameDiv,
    textLabel,
    type,
    value,
    name,
    togglePasswordVisibility,
    children,
    ...props
}) => {
    return (
        <div className={`relative ${classNameDiv}`}>
            <label htmlFor={id}>{textLabel}</label>
            <input
                id={id}
                className="input"
                name={id}
                type={type}
                value={value}
                {...props}
            />
            <span
                className="absolute right-3 top-8 h-6 w-6 flex items-center cursor-pointer"
                onClick={togglePasswordVisibility}
            >
                {children}
            </span>
        </div>
    );
};

export default InputWithIcon;
