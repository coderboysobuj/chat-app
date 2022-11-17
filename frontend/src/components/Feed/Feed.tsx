import {
  Avatar,
  Box,
  Flex,
  Icon,
  IconButton,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";

import toast from "react-hot-toast";
import { FiInfo } from "react-icons/fi";
import { MdArrowBack } from "react-icons/md";
import { Session } from "../../context/Auth/Auth";

import { Chat } from "../../context/Chat/Chat";

import SocketContext from "../../context/Socket/Socket";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";

import useChatUpdated from "../../hooks/useChatUpdated";
import useMessage from "../../hooks/useMessage";
import { getName } from "../../utils/functions";
import Item from "./Item";
import MessageInput from "./MessageInput";

const Feed: React.FunctionComponent = () => {
  const { colorMode } = useColorMode();
  const { chatState, unsetSelectedChat } = useChatUpdated();

  const { session } = useAuth();
  const axios = useAxios();
  const { messages, setMessages, newMessage } = useMessage();
  const { socket } = useContext(SocketContext).SocketState;
  const [loading, setLoading] = useState<boolean>(false);
  const viewRef = useRef<HTMLDivElement>(null);

  const scrollTobottom = () => {
    viewRef.current?.scrollTo({
      top: viewRef.current?.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const getMessage = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `/api/message/${chatState?.selectedChat?.id}`
        );
        setMessages([...response.data]);
      } catch (error: any) {
        toast.error("Fail to get message");
      } finally {
        setLoading(false);
      }
    };
    getMessage();

    scrollTobottom();
  }, [chatState.selectedChat]);

  useEffect(() => {
    socket?.on("reverse_message", ({ message }) => {
      newMessage(message);
      scrollTobottom();
    });
    return () => {
      socket?.off("reverse_message");
    };
  }, [socket]);

  return (
    <Flex
      direction="column"
      justify="space-between"
      display={{
        base: chatState.selectedChat ? "flex" : "none",
        md: "flex",
      }}
      height="100vh"
      flexGrow={1}
      bg={colorMode === "light" ? "white" : "blackAlpha.100"}
      p={4}
    >
      <Flex justify="space-between">
        <Flex align="center" gap={2}>
          <Flex align="center" gap={2}>
            <IconButton
              display={{ md: "none" }}
              onClick={() => {
                unsetSelectedChat();
              }}
              aria-label="go-back"
              icon={<Icon fontSize="2xl" as={MdArrowBack} />}
            />
            <Avatar
              name={getName(chatState.selectedChat as Chat, session as Session)}
            />
          </Flex>

          <Flex direction="column" gap={0}>
            <Text fontWeight="semibold">
              {getName(chatState.selectedChat as Chat, session as Session)}
            </Text>
            <Text fontWeight="light">Online</Text>
          </Flex>
        </Flex>
        <Flex align="center" gap={3}>
          <IconButton
            variant="ghost"
            aria-label="info"
            icon={<Icon as={FiInfo} fontSize="2xl" />}
          />
        </Flex>
      </Flex>
      <Box
        paddingTop={2}
        marginTop={2}
        flexGrow={1}
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
        height="100%"
        overflowY="scroll"
        ref={viewRef}
      >
        <Stack spacing={2}>
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            messages.map((item) => (
              <Item key={item.id} message={item} session={session as Session} />
            ))
          )}
          <div style={{ paddingBottom: "70px" }}></div>
        </Stack>
      </Box>
      <MessageInput
        scrollToBottom={scrollTobottom}
        chat={chatState.selectedChat as Chat}
      />
    </Flex>
  );
};

export default Feed;
