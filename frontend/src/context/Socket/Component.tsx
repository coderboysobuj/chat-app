import React, {
  PropsWithChildren,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import useSocket from "../../hooks/useSocket";
import {
  defaultSocketContextState,
  SocketContextProvider,
  SocketReducer,
} from "./Socket";

export interface ISocketContextComponentProps extends PropsWithChildren {}

const SocketContextComponent: React.FunctionComponent<
  ISocketContextComponentProps
> = ({ children }) => {
  const [SocketState, SocketDispatch] = useReducer(
    SocketReducer,
    defaultSocketContextState
  );
  const [loading, setLoading] = useState<boolean>(true);
  const { setAuthStateValue } = useAuth();
  const axios = useAxios();
  const navigate = useNavigate();
  const socket = useSocket();
  useEffect(() => {
    socket.connect();
    SocketDispatch({ type: "update_socket", payload: socket });

    socket.on("connect_error", () => {
      axios
        .post("/api/auth/logout")
        .then(() => {
          setAuthStateValue({ session: null });
          navigate("/login");
        })
        .catch(() => {
          setAuthStateValue({ session: null });
          navigate("/login");
        });
    });
    setLoading(false);
    return () => {
      socket.off("connect_error");
    };
  }, []);
  if (loading) return <h1>Loading...</h1>;
  return (
    <SocketContextProvider value={{ SocketState, SocketDispatch }}>
      {children}
    </SocketContextProvider>
  );
};

export default SocketContextComponent;