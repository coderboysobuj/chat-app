import {
  Flex,
  Stack,
  Avatar,
  Text,
  useColorMode,
  Badge,
} from "@chakra-ui/react";
import React from "react";
import { Session } from "../../atoms/auth";
import { Chat } from "../../atoms/chat";
import useAuth from "../../hooks/useAuth";
import useChat from "../../hooks/useChat";
import { getName } from "../../utils/functions";
interface IChatItemProps {
  chat: Chat;
}
const ChatItem: React.FunctionComponent<IChatItemProps> = ({ chat }) => {
  const { colorMode } = useColorMode();
  const { authStateValue } = useAuth();
  const { setChatStateValue } = useChat();

  return (
    <Flex
      align="center"
      justify="space-between"
      bg={colorMode === "light" ? "white" : "blackAlpha.200"}
      padding={2}
      _hover={{
        background: colorMode === "light" ? "blue.100" : "whiteAlpha.200",
      }}
      cursor="pointer"
      boxShadow="sm"
      borderRadius="md"
      onClick={() =>
        setChatStateValue((prev) => ({ ...prev, selectedChat: chat }))
      }
    >
      <Stack direction="row" align="center">
        <Avatar name="Sobuj khan" />
        {chat.lastMessage ? (
          <Flex direction="column">
            <Text fontSize="md" fontWeight="semibold">
              {getName(chat, authStateValue.session as Session)}
            </Text>
            <Text fontWeight="thin">{chat.lastMessage}</Text>
          </Flex>
        ) : (
          <Text fontSize="md" fontWeight="semibold">
            {getName(chat, authStateValue.session as Session)}
          </Text>
        )}
      </Stack>
      <Stack>
        <Text fontWeight="light">8:40</Text>
        <Badge width="max-content" colorScheme="blue">
          2
        </Badge>
      </Stack>
    </Flex>
  );
};

export default ChatItem;
