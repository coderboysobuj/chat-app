import {
  Flex,
  InputGroup,
  InputLeftElement,
  Icon,
  Input,
  InputRightElement,
  IconButton,
  Text,
} from "@chakra-ui/react";
import EmojiPicker from "emoji-picker-react";
import React, { FormEvent, Ref, useContext, useEffect, useState } from "react";
import { MdAttachFile, MdEmojiEmotions, MdSend } from "react-icons/md";
import { Chat } from "../../atoms/chat";
import SocketContext from "../../context/Socket/Socket";
import useMessage from "../../hooks/useMessage";

interface IMessageInputProps {
  chat: Chat;
  scrollToBottom: () => void;
}

const MessageInput: React.FunctionComponent<IMessageInputProps> = ({
  chat,
  scrollToBottom,
}) => {
  const { socket } = useContext(SocketContext).SocketState;
  const [text, setText] = useState<string>("");

  const [typing, setTyping] = useState<boolean>(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);

  const { setMessageState } = useMessage();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text && text === "") {
      return;
    }
    socket?.emit("send_message", { text: text, chat }, (response: any) => {
      const message = response.message;

      setMessageState((prev) => ({
        ...prev,
        messages: [...prev.messages, message],
      }));

      scrollToBottom();

      setText("");
    });
  };

  useEffect(() => {
    socket?.on("typing", ({ typing }) => {
      setTyping(typing as boolean);
    });

    return () => {
      socket?.off("typing");
    };
  }, [socket]);

  const handleTyping = () => {
    socket?.emit("typing", { chat, isTyping: true });
  };
  const handleKeyup = () => {
    setTimeout(() => {
      socket?.emit("typing", { chat, isTyping: false });
    }, 5000);
  };
  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
      {typing && <Text>Typing...</Text>}
      {showEmojiPicker ? (
        <EmojiPicker
          width="400px"
          height="350px"
          onEmojiClick={(emojiObj) => {
            setText((prev) => prev.concat(emojiObj.emoji));
          }}
        />
      ) : null}
      <Flex gap={4} align="center" justify="space-between" mt={3}>
        <InputGroup>
          <InputLeftElement>
            <Icon fontSize="xl" as={MdAttachFile} />
          </InputLeftElement>
          <Input
            variant="filled"
            placeholder="Type..."
            value={text}
            onKeyUp={handleKeyup}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleTyping}
          />
          <InputRightElement>
            <Icon
              onClick={() => setShowEmojiPicker((prev) => !prev)}
              fontSize="xl"
              as={MdEmojiEmotions}
              cursor="pointer"
            />
          </InputRightElement>
        </InputGroup>
        <IconButton
          aria-label="sent"
          icon={<Icon as={MdSend} />}
          colorScheme="blue"
          type="submit"
        />
      </Flex>
    </form>
  );
};

export default MessageInput;
