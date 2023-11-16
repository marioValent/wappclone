import { useMemo } from "react";
import socketIOClient from "socket.io-client";

export const useSocket = () => {
    const socket = useMemo(
        () => socketIOClient("https://mario-ws.webmarc.cucuza.com/"),
        []
    );

    return socket;
};
