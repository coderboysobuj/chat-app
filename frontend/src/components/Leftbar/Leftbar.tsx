import {
  Avatar,
  Box,
  Divider,
  Flex,
  Icon,
  IconButton,
  MenuButton,
  Stack,
  Switch,
  useColorMode,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";

import { BiCodeBlock } from "react-icons/bi";
import { MdCall, MdChat, MdPeople, MdSettings } from "react-icons/md";
import useAuth from "../../hooks/useAuth";
import LeftbarItem from "./LeftbarItem";
import LogoutDialog from "../Dialog/Logout";
import { FaMoon, FaSun } from "react-icons/fa";

const Leftbar: React.FC = () => {
  const { authStateValue } = useAuth();
  const { colorMode, setColorMode } = useColorMode();
  const cancelRef = useRef<null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Box
        display={{ base: "none", sm: "unset" }}
        width="80px"
        height="100vh"
        bg={colorMode === "light" ? "gray.100" : "whiteAlpha.100"}
        boxShadow="xl"
        px={2}
        py={4}
      >
        <Stack align="center" height="100%" justify="space-between">
          <Stack spacing={9}>
            <Flex
              align="center"
              justify="center"
              bg="blue.100"
              p={2}
              width="45px"
              borderRadius="xl"
            >
              <Icon
                as={BiCodeBlock}
                fontSize="3xl"
                color="orange.400"
                fontWeight="bold"
              />
            </Flex>
            <Stack spacing={3}>
              <LeftbarItem label="home" icon={MdChat} />
              <LeftbarItem label="people" icon={MdPeople} />
              <LeftbarItem label="call" active icon={MdCall} />
              <Divider />
              <LeftbarItem label="settings" icon={MdSettings} />
            </Stack>
          </Stack>
          <Stack spacing={4}>
            <IconButton
              aria-label="dark_light"
              size="md"
              onClick={() =>
                setColorMode(colorMode === "dark" ? "light" : "dark")
              }
              icon={
                <Icon
                  fontSize="2xl"
                  as={colorMode === "dark" ? FaSun : FaMoon}
                />
              }
            />
            <LogoutDialog>
              <Avatar
                as={MenuButton}
                cursor="pointer"
                onClick={() => setIsOpen(true)}
                size="sm"
                name={authStateValue.session?.user.username}
              />
            </LogoutDialog>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default Leftbar;
