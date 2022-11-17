import { useContext } from "react";
import ChatContext, { Chat } from "../context/Chat/Chat";

const useChatUpdated = () => {
  const { ChatState, ChatDispatch } = useContext(ChatContext);

  const setAllChat = (chats: Chat[]) => {
    ChatDispatch({ type: "set_all_chat", payload: chats });
  };
  const addNewChat = (chat: Chat) => {
    ChatDispatch({ type: "new_chat", payload: chat });
  };
  const setSelectedChat = (chat: Chat) => {
    ChatDispatch({ type: "set_selected_chat", payload: chat });
  };
  const unsetSelectedChat = () => {
    ChatDispatch({ type: "unset_selected_chat", payload: undefined });
  };
  return {
    chatState: {
      chats: ChatState.chats,
      selectedChat: ChatState.selectedChat,
    },
    setAllChat,
    setSelectedChat,
    unsetSelectedChat,
    addNewChat,
  };
};

export default useChatUpdated;
