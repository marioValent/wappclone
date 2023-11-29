import React from "react";
import ResetPassword from "../components/ResetPassword/ResetPassword";

const ResetPasswordPage = () => {
    return (
        <div className="relative min-h-screen bg-gradient-to-b from-app-gray to-app-gray-deeper">
            <div className="absolute bg-main-green h-32 w-full"></div>
            <div className="fixed w-full h-full flex items-center justify-center">
                <ResetPassword />
            </div>
        </div>
    );
};

export default ResetPasswordPage;
