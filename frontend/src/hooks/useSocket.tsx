import { useEffect, useRef } from "react";
import { Socket } from "socket.io-client";

import useAuth from "./useAuth";
import { io } from "socket.io-client";

const useSocket = (): Socket => {
  const { authStateValue } = useAuth();
  const { current: socket } = useRef(
    io(import.meta.env.VITE_SERVER_URL, {
      withCredentials: true,
      auth: {
        token: `Bearer ${authStateValue.session?.accessToken}`,
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
