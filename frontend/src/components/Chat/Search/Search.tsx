import {
  Avatar,
  Button,
  Flex,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  Tag,
  TagRightIcon,
  Text,
  useColorMode,
} from "@chakra-ui/react";

import React, { FormEvent, useState } from "react";
import { User } from "../../../atoms/auth";
import useAxios from "../../../hooks/useAxios";
import { MdClose } from "react-icons/md";
import toast from "react-hot-toast";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Chat, chatState } from "../../../atoms/chat";

interface ISearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<ISearchProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [creating, setCreating] = useState<boolean>(false);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const axios = useAxios();
  const [state, setChatState] = useRecoilState(chatState);
  const { colorMode } = useColorMode();

  const searchUsers = async () => {
    if (!input) return;
    setLoading(true);
    try {
      const response = await axios.post("/api/user/search", {
        searchTerm: input,
      });
      setUsers(response.data);
    } catch (error) {
      console.log("Search error", error);
    } finally {
      setLoading(false);
    }
  };
  const selectUser = (user: User) => {
    const exists = selectedUsers.find(
      (item) => item.username === user.username
    );
    if (!exists) {
      setSelectedUsers((prev) => [...prev, user]);
    } else {
      toast.error("Already added");
    }
  };
  const handleCreateChat = async () => {
    setCreating(true);
    try {
      const { data } = await axios.post("api/chat/create", {
        users: selectedUsers,
      });
      const newChat: Chat = {
        id: data.id,
        users: data.users,
      };
      setChatState((prev) => ({ ...prev, chats: [newChat, ...prev.chats] }));
      onClose();
      setSelectedUsers([]);
      setInput("");
    } catch (error: any) {
      if (!error?.response) {
        toast.error("Something went wrong try again later");
      } else {
        toast.error(error.response?.data?.message);
      }
      console.log("Creating chat error", error);
    } finally {
      setCreating(false);
    }
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new contact </ModalHeader>
          <ModalCloseButton />
          <ModalBody mb={3}>
            <Stack>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  searchUsers();
                }}
              >
                <Flex gap={3} align="center" justify="space-between">
                  <Input
                    placeholder="Username"
                    value={input}
                    onChange={(e) => {
                      setInput(e.target.value);
                      searchUsers();
                    }}
                  />
                  <Button type="submit" colorScheme="blue">
                    Search
                  </Button>
                </Flex>
              </form>
              <Flex>
                {selectedUsers.length > 0
                  ? selectedUsers.map((user) => (
                      <Tag size="lg" key={user.id}>
                        {user.username}
                        <TagRightIcon cursor="pointer">
                          <Icon as={MdClose} fontSize="3xl  " />
                        </TagRightIcon>
                      </Tag>
                    ))
                  : null}
              </Flex>
              <Stack spacing={3}>
                {loading ? (
                  <Spinner size="lg" />
                ) : (
                  users.map((item) => (
                    <Flex
                      key={item.id}
                      align="center"
                      padding={2}
                      borderRadius="md"
                      gap={3}
                      cursor="pointer"
                      _hover={{
                        boxShadow: "md",
                        bg:
                          colorMode === "dark" ? "whiteAlpha.300" : "blue.200",
                      }}
                      onClick={() => selectUser(item)}
                    >
                      <Avatar name={item.username} size="sm" />
                      <Text fontWeight="semibold">{item.username}</Text>
                    </Flex>
                  ))
                )}
              </Stack>
              <Button
                onClick={handleCreateChat}
                colorScheme="blue"
                disabled={selectedUsers.length === 0}
                isLoading={creating}
              >
                Create chat
              </Button>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SearchModal;
