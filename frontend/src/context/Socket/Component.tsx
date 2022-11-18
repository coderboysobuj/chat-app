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
  const { unsetAuth } = useAuth();
  const axios = useAxios();
  const navigate = useNavigate();
  const socket = useSocket();
  useEffect(() => {
    socket.connect();
    console.log("Connecting....");
    SocketDispatch({ type: "update_socket", payload: socket });

    // socket.on("connect_error", () => {
    //   console.log("Socket Connection fail");
    //   axios
    //     .post("/api/auth/logout")
    //     .then(() => {
    //       unsetAuth();
    //       navigate("/login");
    //     })
    //     .catch(() => {
    //       unsetAuth();
    //       navigate("/login");
    //     });
    // });
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
