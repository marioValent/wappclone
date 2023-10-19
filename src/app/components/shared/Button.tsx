import React, { ButtonHTMLAttributes, ReactNode } from "react";

export type BtnVariant = "primary" | "secondary" | "dark";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    isIcon?: boolean;
    variant?: BtnVariant;
}

const Button = ({
    children,
    className = "flex gap-2",
    isIcon = false,
    variant = "primary",
    ...props
}: ButtonProps) => {
    const classes = isIcon ? `p-1` : `btn btn-${variant}`;
    return (
        <button className={`${classes} ${className}`} {...props}>
            {children}
        </button>
    );
};

export default Button;
