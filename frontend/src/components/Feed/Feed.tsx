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
import React, { useContext, useEffect, useRef } from "react";

import toast from "react-hot-toast";
import { FiInfo } from "react-icons/fi";
import { MdArrowBack } from "react-icons/md";
import { Session } from "../../atoms/auth";
import { Chat } from "../../atoms/chat";
import SocketContext from "../../context/Socket/Socket";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import useChat from "../../hooks/useChat";
import useMessage from "../../hooks/useMessage";
import { getName } from "../../utils/functions";
import Item from "./Item";
import MessageInput from "./MessageInput";

const Feed: React.FunctionComponent = () => {
  const { colorMode } = useColorMode();
  const { chatStateValue, setChatStateValue } = useChat();
  const { authStateValue } = useAuth();
  const axios = useAxios();
  const { messageState, setMessageState } = useMessage();
  const { socket } = useContext(SocketContext).SocketState;

  const scrollRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);

  const scrollTobottom = () => {
    viewRef.current?.scrollTo({
      top: viewRef.current?.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const getMessage = async () => {
      try {
        const response = await axios.get(
          `/api/message/${chatStateValue?.selectedChat?.id}`
        );
        setMessageState({ messages: [...response.data] });
      } catch (error: any) {
        toast.error("Fail to get message");
      }
    };
    getMessage();

    scrollTobottom();
  }, [chatStateValue.selectedChat]);

  useEffect(() => {
    socket?.on("reverse_message", ({ message }) => {
      setMessageState((prev) => ({
        ...prev,
        messages: [...prev.messages, message],
      }));
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
        base: chatStateValue.selectedChat ? "flex" : "none",
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
                setChatStateValue((prev) => ({ ...prev, selectedChat: null }));
              }}
              aria-label="go-back"
              icon={<Icon fontSize="2xl" as={MdArrowBack} />}
            />
            <Avatar
              name={getName(
                chatStateValue.selectedChat as Chat,
                authStateValue.session as Session
              )}
            />
          </Flex>

          <Flex direction="column" gap={0}>
            <Text fontWeight="semibold">
              {getName(
                chatStateValue.selectedChat as Chat,
                authStateValue.session as Session
              )}
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
          {messageState.messages.map((item) => (
            <Item
              key={item.id}
              message={item}
              session={authStateValue.session as Session}
            />
          ))}
          <div style={{ paddingBottom: "70px" }}></div>
        </Stack>
      </Box>
      <MessageInput
        scrollToBottom={scrollTobottom}
        chat={chatStateValue.selectedChat as Chat}
      />
    </Flex>
  );
};

export default Feed;
