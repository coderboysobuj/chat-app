import { Flex, useColorMode } from "@chakra-ui/react";
import { Navigate, Outlet } from "react-router-dom";
import ChatComponent from "../../context/Chat/ChatProvider";
import MessageComponent from "../../context/Message/MessageContextComponent";
import SocketContextComponent from "../../context/Socket/Component";
import useAuth from "../../hooks/useAuth";
import Leftbar from "../Leftbar/Leftbar";

const Layout = () => {
  const { colorMode } = useColorMode();
  const { session } = useAuth();

  return (
    <ChatComponent>
      <SocketContextComponent>
        <MessageComponent>
          {session?.accessToken ? (
            <Flex bg={colorMode === "dark" ? "whiteAlpha.200" : "white"}>
              <Leftbar />
              <Outlet />
            </Flex>
          ) : (
            <Navigate to="/login" />
          )}
        </MessageComponent>
      </SocketContextComponent>
    </ChatComponent>
  );
};

export default Layout;
