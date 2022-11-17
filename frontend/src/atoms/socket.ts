import { atom } from "recoil";
import { Socket } from "socket.io-client";

interface ISocket {
  socket: Socket | null;
}

const socketState = atom<ISocket>({
  key: "socket",
  default: {
    socket: null as Socket | null,
  },
});

export default socketState;
