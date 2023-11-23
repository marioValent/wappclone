import React from "react";
import Image from "next/image";
import loadingIcon from "@/../public/loadingIcon.svg";

interface SpinnerProps {
    customClassName?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ customClassName = "" }) => {
    return (
        <Image
            alt="loading-spiner"
            src={loadingIcon}
            className={`mx-auto mt-16 animate-spin ${customClassName}`}
        />
    );
};

export default Spinner;
