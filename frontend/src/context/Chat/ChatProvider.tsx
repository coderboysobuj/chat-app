import React, { PropsWithChildren, useReducer } from "react";

import {
  ChatContextProvider,
  ChatReducer,
  defaultChatContextState,
} from "./Chat";

export interface IChatContextComponentProps extends PropsWithChildren {}

const ChatComponent: React.FunctionComponent<IChatContextComponentProps> = ({
  children,
}) => {
  const [ChatState, ChatDispatch] = useReducer(
    ChatReducer,
    defaultChatContextState
  );
  return (
    <ChatContextProvider value={{ ChatState, ChatDispatch }}>
      {children}
    </ChatContextProvider>
  );
};

export default ChatComponent;
