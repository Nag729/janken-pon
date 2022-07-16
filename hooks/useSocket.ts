import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

// FIXME: import でエラーになる問題
const io = require("socket.io-client");
const url = process.env.NEXT_PUBLIC_SOCKET_URL || `http://localhost:3001`;

export const useSocket = () => {
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
