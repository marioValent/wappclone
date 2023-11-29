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
                {value && iconRight}
            </div>
        </div>
    );
});

export default Input;
