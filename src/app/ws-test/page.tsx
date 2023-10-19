"use client";

import { useEffect } from "react";

const Test = () => {
    useEffect(() => {
        try {
            const ws = new WebSocket("ws://localhost:4005");

            ws.addEventListener("message", (message) => {
                console.log(message);
            });
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <div>
            <p>Test</p>
        </div>
    );
};

export default Test;
