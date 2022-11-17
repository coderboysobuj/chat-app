import { createContext } from "react";

export interface User {
  id: string;
  username: string;
  image?: string;
}

export interface Session {
  user: User;
  accessToken: string;
}

export interface IAuthContextState {
  session: Session | undefined;
}

export const defaultAuthContextState: IAuthContextState = {
  session: undefined,
};

export type TAuthContextActions = "set_auth" | "unset_auth";

export type TAuthContextPayload = Session | undefined;

export interface IAuthContextActions {
  type: TAuthContextActions;
  payload: TAuthContextPayload;
}

export const AuthReducer = (
  state: IAuthContextState,
  action: IAuthContextActions
) => {
  switch (action.type) {
    case "set_auth": {
      return { ...state, session: action.payload as Session };
    }
    default:
      return { ...state };
  }
};

interface IAuthContextProps {
  AuthState: IAuthContextState;
  AuthDispatch: React.Dispatch<IAuthContextActions>;
}

const AuthContext = createContext<IAuthContextProps>({
  AuthState: defaultAuthContextState,
  AuthDispatch: () => {},
});

export const AuthContextConsumer = AuthContext.Consumer;
export const AuthContextProvider = AuthContext.Provider;

export default AuthContext;
