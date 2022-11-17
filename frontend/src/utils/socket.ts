import { io } from "socket.io-client";

import { Session } from "../atoms/auth";

const socket = (session: Session) =>
  io("http://localhost:5000", {
    withCredentials: true,
    auth: {
      token: `Bearer ${session?.accessToken}`,
    },
    autoConnect: false,
  });

export default socket;
