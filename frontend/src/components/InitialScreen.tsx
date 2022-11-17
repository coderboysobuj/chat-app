import { Center, Heading } from "@chakra-ui/react";
import React from "react";
const InitialScreen: React.FunctionComponent = () => {
  return (
    <Center w="100%" height="100vh" display={{ base: "none", md: "flex" }}>
      <Heading size="lg">Select a friends to start chating..</Heading>
    </Center>
  );
};

export default InitialScreen;
