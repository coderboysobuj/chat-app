import {
  Box,
  Center,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React from "react";
import { Navigate } from "react-router-dom";
import LoginComponent from "../components/Login/Login";
import Register from "../components/Login/Register";
import useAuth from "../hooks/useAuth";
const Login: React.FunctionComponent = () => {
  const { authStateValue } = useAuth();

  return (
    <>
      {authStateValue.session?.accessToken ? (
        <Navigate to="/app" />
      ) : (
        <Center height="100vh">
          <Box width="450px">
            <Tabs>
              <TabList>
                <Tab>Login</Tab>
                <Tab>Register</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <LoginComponent />
                </TabPanel>
                <TabPanel>
                  <Register />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Center>
      )}
    </>
  );
};

export default Login;
