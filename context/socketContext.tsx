import { createContext } from "react";
import { io, Socket } from "socket.io-client";

type State = {
  socket: Socket;
};

const url = process.env.NEXT_PUBLIC_SOCKET_URL || `http://localhost:3001`;
const socket = io(url);

export const SocketContext = createContext<State>({
  socket,
});

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
