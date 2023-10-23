import Image from "next/image";
import React, { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    classNameDiv?: string;
    iconRight?: React.ReactNode;
    iconLeft?: React.ReactNode;
    name?: string;
    textLabel?: string;
    type?: string;
    value: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
    {
        id,
        className = "input focus:outline-none p-2",
        classNameDiv,
        iconLeft,
        iconRight,
        name,
        textLabel,
        type = "text",
        value,
        ...props
    }: InputProps,
    ref
) {
    return (
        <div className={classNameDiv}>
            <label htmlFor={id}>{textLabel}</label>
            {/* <span
                onClick={clickIconHandler}
                className="absolute left-3 top-1/2 -translate-y-1/2 h-6 w-6 flex items-center cursor-pointer"
            >
                {iconLeft}
            </span> */}
            <div className="input flex items-center">
                {iconLeft}
                <input
                    id={id}
                    className={className}
                    name={id}
                    ref={ref}
                    type={type}
                    value={value}
                    {...props}
                />
                {
                    iconRight
                    // <span
                    //     onClick={clickIconHandler}
                    //     className="absolute right-3 top-1/2 h-6 w-6 flex items-center cursor-pointer"
                    // >
                    //     {iconRight}
                    // </span>
                }
            </div>
        </div>
    );
});

export default Input;
