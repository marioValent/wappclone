import React from "react";
import ChatApp from "../components/ChatApp/ChatApp";

const HomePage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-main-green from-[8rem] to-app-gray-deeper to-[8rem] relative">
            {/* <div className="bg-main-green h-32 w-full"></div> */}
            <div className="fixed inset-y-4 inset-x-40">
                <ChatApp />
            </div>
        </div>
    );
};

export default HomePage;
