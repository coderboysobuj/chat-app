import React, { createContext } from "react";
import { User } from "../Auth/Auth";

export interface Chat {
  id: string;
  lastMessage?: string;
  users: User[];
  createdAt?: any;
  updatedAt?: any;
}

export interface IChatContextState {
  chats: Chat[];
  selectedChat: Chat | undefined;
}

export const defaultChatContextState: IChatContextState = {
  chats: [],
  selectedChat: undefined,
};

export type TChatContextActions =
  | "set_all_chat"
  | "new_chat"
  | "set_selected_chat"
  | "unset_selected_chat";

export type TChatContextPayload = Chat[] | Chat | undefined;

export interface IChatContextActions {
  type: TChatContextActions;
  payload: TChatContextPayload;
}

export const ChatReducer = (
  state: IChatContextState,
  action: IChatContextActions
) => {
  switch (action.type) {
    case "set_all_chat":
      return { ...state, chats: action.payload as Chat[] };
    case "new_chat": {
      return { ...state, chats: [action.payload, ...state.chats] as Chat[] };
    }
    case "set_selected_chat": {
      return { ...state, selectedChat: action.payload as Chat };
    }
    case "unset_selected_chat": {
      return { ...state, selectedChat: undefined };
    }
    default:
      return { ...state };
  }
};

interface IChatContextProps {
  ChatState: IChatContextState;
  ChatDispatch: React.Dispatch<IChatContextActions>;
}

const ChatContext = createContext<IChatContextProps>({
  ChatState: defaultChatContextState,
  ChatDispatch: () => {},
});

export const ChatContextConsumer = ChatContext.Consumer;
export const ChatContextProvider = ChatContext.Provider;

export default ChatContext;
