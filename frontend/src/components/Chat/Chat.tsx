import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  IconButton,
  MenuButton,
  Skeleton,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdAdd, MdMenuOpen } from "react-icons/md";
import { Chat } from "../../context/Chat/Chat";

import SocketContext from "../../context/Socket/Socket";
import useAxios from "../../hooks/useAxios";
import useChatUpdated from "../../hooks/useChatUpdated";
import Logout from "../Dialog/Logout";
import ChatItem from "./ChatItem";
import SearchModal from "./Search/Search";
import SearchInput from "./SearchInput";

const ChatWrapper: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const onClose = () => setIsOpen(false);
  const { colorMode } = useColorMode();

  const axios = useAxios();
  const { socket } = useContext(SocketContext).SocketState;

  const { chatState, setAllChat, addNewChat } = useChatUpdated();

  useEffect(() => {
    const getChats = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/api/chat");
        setAllChat(data);
      } catch (error) {
        toast.error("something went wrong");
      } finally {
        setLoading(false);
      }
    };
    getChats();
  }, []);

  useEffect(() => {
    socket?.on("new_chat", (payload) => {
      const chat: Chat = {
        id: payload.id,
        users: payload.users,
        updatedAt: payload.updatedAt,
        createdAt: payload.createdAt,
        lastMessage: payload.lastMessage,
      };

      addNewChat(chat);
      console.log("new chat here");
    });

    socket?.on("update_chat", ({ chat }) => {
      console.log("We have to upadate chat list with letest message");
    });
    return () => {
      socket?.off("new_chat");
      socket?.off("update_chat");
    };
  }, [socket]);

  return (
    <>
      <Box
        width={{ base: "100%", md: "400px" }}
        height="100vh"
        bg={colorMode === "light" ? "gray.50" : "blackAlpha.300"}
        boxShadow="md"
        px={2}
        py={4}
        display={{
          base: chatState.selectedChat ? "none" : "unset",
          md: "unset",
        }}
      >
        <Stack spacing={4} height="100%">
          <Flex align="center" justify="space-between">
            <Text fontWeight="semibold" fontSize="xl">
              Chats
            </Text>
            <Logout>
              <IconButton
                as={MenuButton}
                variant="ghost"
                colorScheme="blue"
                aria-label="refresh"
                icon={<Icon fontSize="2xl" as={MdMenuOpen} />}
              />
            </Logout>
          </Flex>
          <SearchInput />
          <Flex align="center">
            <Icon as={MdAdd} fontSize="xl" />
            <Button
              onClick={() => setIsOpen(true)}
              variant="ghost"
              size="sm"
              colorScheme="blue"
            >
              Add new friend
            </Button>
          </Flex>
          <Divider />
          <Stack
            sx={{
              "&::-webkit-scrollbar": {
                width: "10px",
                borderRadius: "8px",
                backgroundColor: `rgba(0, 0, 0, 0.05)`,
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: `rgba(0, 0, 0, 0.05)`,
              },
            }}
            spacing={4}
            maxH="100%"
            overflowY="scroll"
          >
            <Stack spacing={4}>
              <Text fontSize="md" fontWeight="semibold">
                All Chats
              </Text>
              <Stack>
                {loading
                  ? [0, 1, 2].map((i) => (
                      <Skeleton key={`chatlist:${i}`}>
                        <Box height="50px"></Box>
                      </Skeleton>
                    ))
                  : chatState.chats.length
                  ? chatState.chats.map((item) => (
                      <ChatItem chat={item} key={item.id} />
                    ))
                  : null}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Box>
      <SearchModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default ChatWrapper;
