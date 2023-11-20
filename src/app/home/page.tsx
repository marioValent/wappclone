import React from "react";
import ChatApp from "../components/ChatApp/ChatApp";

const HomePage = () => {
    return (
        <div className="relative min-h-screen bg-gradient-to-b from-app-gray to-app-gray-deeper">
            <div className="absolute bg-main-green h-32 w-full"></div>
            <div className="fixed inset-y-4 inset-x-40">
                <ChatApp />
            </div>
        </div>
    );
};

export default HomePage;
