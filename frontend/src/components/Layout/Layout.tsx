import { Flex, useColorMode } from "@chakra-ui/react";
import { Navigate, Outlet } from "react-router-dom";
import SocketContextComponent from "../../context/Socket/Component";
import useAuth from "../../hooks/useAuth";
import Leftbar from "../Leftbar/Leftbar";

const Layout = () => {
  const { colorMode } = useColorMode();
  const { authStateValue } = useAuth();

  return (
    <SocketContextComponent>
      {authStateValue.session?.accessToken ? (
        <Flex bg={colorMode === "dark" ? "whiteAlpha.200" : "white"}>
          <Leftbar />
          <Outlet />
        </Flex>
      ) : (
        <Navigate to="/login" />
      )}
    </SocketContextComponent>
  );
};

export default Layout;
