import { useEffect, useRef } from "react";
import { Socket } from "socket.io-client";

import useAuth from "./useAuth";
import { io } from "socket.io-client";

const useSocket = (): Socket => {
  const { session } = useAuth();
  const { current: socket } = useRef(
    io(import.meta.env.VITE_SERVER_URL, {
      withCredentials: true,
      auth: {
        token: `Bearer ${session?.accessToken}`,
      },
      autoConnect: false,
    })
  );

  useEffect(() => {
    return () => {
      if (socket) socket.close();
    };
  }, [socket]);

  return socket;
};

export default useSocket;
