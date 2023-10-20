import React from "react";
import ChatApp from "../components/ChatApp/ChatApp";

const HomePage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-app-gray to-app-gray-deeper relative">
            <div className="bg-main-green h-32 w-full"></div>
            <div className="fixed inset-y-4 inset-x-6">
                <ChatApp />
            </div>
        </div>
    );
};

export default HomePage;
