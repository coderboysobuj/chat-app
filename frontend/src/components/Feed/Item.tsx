import { Flex, Box, Text } from "@chakra-ui/react";

import React from "react";
import { Session } from "../../atoms/auth";
import { Message } from "../../atoms/message";

interface IItemProps {
  message: Message;
  session: Session;
}

const Item: React.FunctionComponent<IItemProps> = ({ message, session }) => {
  return (
    <Flex
      justifyContent={message.userId === session.user.id ? "end" : "start"}
      padding={1}
      borderRadius="xl"
    >
      <Box
        padding={2}
        borderRadius="lg"
        width="max-content"
        bg={message.userId === session.user.id ? "blue.400" : "whiteAlpha.300"}
        color="white"
      >
        <Text>{message.text}</Text>
      </Box>
    </Flex>
  );
};

export default Item;
