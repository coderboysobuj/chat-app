import {
  AlertTitle,
  Box,
  Button,
  Center,
  Flex,
  Image,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import heroImage from "../../assets/hero-icon.png";

const InitialFeed = () => {
  const { colorMode } = useColorMode();

  return (
    <Center
      height="100vh"
      bg={colorMode === "light" ? "white" : "blackAlpha.100"}
      flexGrow={1}
      p={4}
      width="100%"
      display={{ base: "none", md: "unset" }}
    >
      <Stack>
        {colorMode === "light" && <Image src={heroImage} />}
        <Text>
          Select a conversation or start a{" "}
          <span
            style={{
              fontWeight: "bold",
              color: "blue",
              cursor: "pointer",
            }}
          >
            new one
          </span>
        </Text>
      </Stack>
    </Center>
  );
};

export default InitialFeed;
