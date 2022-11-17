import {
  Avatar,
  Badge,
  Flex,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import { Session } from "../../context/Auth/Auth";

import { Chat } from "../../context/Chat/Chat";

import useAuth from "../../hooks/useAuth";
import useChatUpdated from "../../hooks/useChatUpdated";
import { getName } from "../../utils/functions";
interface IChatItemProps {
  chat: Chat;
}
const ChatItem: React.FunctionComponent<IChatItemProps> = ({ chat }) => {
  const { colorMode } = useColorMode();
  const { session } = useAuth();
  const { setSelectedChat } = useChatUpdated();

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
      onClick={() => setSelectedChat(chat)}
    >
      <Stack direction="row" align="center">
        <Avatar name="Sobuj khan" />
        {chat.lastMessage ? (
          <Flex direction="column">
            <Text fontSize="md" fontWeight="semibold">
              {getName(chat, session as Session)}
            </Text>
            <Text fontWeight="thin">{chat.lastMessage}</Text>
          </Flex>
        ) : (
          <Text fontSize="md" fontWeight="semibold">
            {getName(chat, session as Session)}
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
