import { atom } from "recoil";

export interface Message {
  id: string;
  text: string;
  userId: string;
  createdAt: string;
}

type TMessage = {
  messages: Message[] | [];
};

const messageAtom = atom<TMessage>({
  key: "message",
  default: {
    messages: [],
  },
});

export default messageAtom;
