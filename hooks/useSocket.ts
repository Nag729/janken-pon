import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

// FIXME: import でエラーになる問題
const io = require("socket.io-client");

export const useSocket = (url: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketIo = io(url);
    setSocket(socketIo);

    const cleanup = () => {
      socketIo.disconnect();
    };
    return cleanup;
  }, []);

  return socket;
};
