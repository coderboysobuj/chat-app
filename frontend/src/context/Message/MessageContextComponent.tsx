import React, { PropsWithChildren, useReducer } from "react";

import {
  MessageContextProvider,
  MessageReducer,
  defaultMessageContextState,
} from "./Message";

export interface IMessageContextComponentProps extends PropsWithChildren {}

const MessageComponent: React.FunctionComponent<
  IMessageContextComponentProps
> = ({ children }) => {
  const [MessageState, MessageDispatch] = useReducer(
    MessageReducer,
    defaultMessageContextState
  );
  return (
    <MessageContextProvider value={{ MessageState, MessageDispatch }}>
      {children}
    </MessageContextProvider>
  );
};

export default MessageComponent;
