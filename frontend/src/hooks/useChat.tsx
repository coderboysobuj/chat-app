import React from "react";
import { useRecoilState } from "recoil";
import { chatState } from "../atoms/chat";

const useChat = () => {
  const [chatStateValue, setChatStateValue] = useRecoilState(chatState);

  return {
    chatStateValue,
    setChatStateValue,
  };
};

export default useChat;
