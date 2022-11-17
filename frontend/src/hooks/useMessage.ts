import { useContext } from "react";
import MessageContext, { Message } from "../context/Message/Message";

const useMessage = () => {
  const { MessageState, MessageDispatch } = useContext(MessageContext);

  const setMessages = (messages: Message[]) => {
    MessageDispatch({ type: "set_messages", payload: messages });
  };
  const newMessage = (message: Message) => {
    MessageDispatch({ type: "new_message", payload: message });
  };
  return {
    messages: MessageState.messages,
    setMessages,
    newMessage,
  };
};

export default useMessage;
