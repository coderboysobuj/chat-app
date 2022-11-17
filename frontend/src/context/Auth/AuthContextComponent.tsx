import React, { PropsWithChildren, useReducer } from "react";

import {
  AuthContextProvider,
  AuthReducer,
  defaultAuthContextState,
} from "./Auth";

export interface IAuthContextComponentProps extends PropsWithChildren {}

const AuthContextComponent: React.FunctionComponent<
  IAuthContextComponentProps
> = ({ children }) => {
  const [AuthState, AuthDispatch] = useReducer(
    AuthReducer,
    defaultAuthContextState
  );
  return (
    <AuthContextProvider value={{ AuthState, AuthDispatch }}>
      {children}
    </AuthContextProvider>
  );
};

export default AuthContextComponent;
