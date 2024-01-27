import { useMemo } from "react";
import socketIOClient from "socket.io-client";

export const useSocket = () => {
    const socket = useMemo(() => socketIOClient("http://localhost:4000"), []);

    return socket;
};
