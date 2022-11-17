import { createContext } from "react";

export interface Message {
  id: string;
  text: string;
  userId: string;
  createdAt: string;
}

export interface IMessageContextState {
  messages: Message[];
}

export const defaultMessageContextState: IMessageContextState = {
  messages: [],
};

export type TMessageContextActions = "new_message" | "set_messages";

export type TMessageContextPayload = Message[] | Message;

export interface IMessageContextActions {
  type: TMessageContextActions;
  payload: TMessageContextPayload;
}

export const MessageReducer = (
  state: IMessageContextState,
  action: IMessageContextActions
) => {
  switch (action.type) {
    case "set_messages": {
      return { ...state, messages: action.payload as Message[] };
    }
    case "new_message": {
      return {
        ...state,
        messages: [...state.messages, action.payload] as Message[],
      };
    }
    default:
      return { ...state };
  }
};

interface IMessageContextProps {
  MessageState: IMessageContextState;
  MessageDispatch: React.Dispatch<IMessageContextActions>;
}

const MessageContext = createContext<IMessageContextProps>({
  MessageState: defaultMessageContextState,
  MessageDispatch: () => {},
});

export const MessageContextConsumer = MessageContext.Consumer;
export const MessageContextProvider = MessageContext.Provider;

export default MessageContext;
