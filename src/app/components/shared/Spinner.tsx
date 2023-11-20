import React from "react";
import Image from "next/image";
import loadingIcon from "@/../public/loadingIcon.svg";

const Spinner = () => {
    return (
        <Image
            alt="loading-spiner"
            src={loadingIcon}
            className="mx-auto mt-16 animate-spin"
        />
    );
};

export default Spinner;
