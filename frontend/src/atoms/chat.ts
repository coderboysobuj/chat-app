import { atom } from "recoil";
import { User } from "./auth";

export interface Chat {
  id: string;
  lastMessage?: string;
  users: User[];
  createdAt?: any;
  updatedAt?: any;
}

interface IChat {
  chats: Chat[] | null;
  selectedChat?: Chat | null;
}

export const chatState = atom<IChat>({
  key: "chat",
  default: {
    chats: [],
    selectedChat: null as Chat | null,
  },
});
