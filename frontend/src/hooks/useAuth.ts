import { useContext } from "react";

import AuthContext, { Session } from "../context/Auth/Auth";

const useAuth = () => {
  const { AuthState, AuthDispatch } = useContext(AuthContext);

  const setAuth = (session: Session) => {
    AuthDispatch({ type: "set_auth", payload: session });
  };

  const unsetAuth = () => {
    AuthDispatch({ type: "unset_auth", payload: undefined });
  };

  return {
    session: AuthState.session,
    setAuth,
    unsetAuth,
  };
};

export default useAuth;
