import React from "react";
import Image from "next/image";
import InternetErrorImg from "@/../public/internetError.png";

const InternetErrorPage = () => {
    return (
        <div className="bg-white flex items-center justify-center p-12">
            <div>
                <h1 className="text-4xl mb-0">Oops!</h1>
                <h2 className="text-3xl mt-0 text-red-600">
                    No internet connection
                </h2>
                <h3 className="text-2xl mt-10 w-10/12">
                    Something went wrong. Try to refresh this page
                </h3>
            </div>
            <Image src={InternetErrorImg} alt="internet error image" />
        </div>
    );
};

export default InternetErrorPage;
