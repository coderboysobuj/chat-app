import {
  InputGroup,
  InputLeftElement,
  Icon,
  Input,
  InputRightElement,
  Box,
  Stack,
  HStack,
  Flex,
  Avatar,
  Text,
  useColorMode,
  VStack,
  Skeleton,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdSearch, MdFilter, MdFilter1, MdSort } from "react-icons/md";
import { useRecoilState } from "recoil";
import { User } from "../../atoms/auth";
import { Chat, chatState } from "../../atoms/chat";
import useAxios from "../../hooks/useAxios";

const SearchInput: React.FunctionComponent = () => {
  const { colorMode } = useColorMode();

  const [input, setInput] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [creating, setCreating] = useState<boolean>(false);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const axios = useAxios();
  const [state, setChatState] = useRecoilState(chatState);

  useEffect(() => {
    if (!input) {
      setUsers([]);
    }
  }, [input, setInput]);

  const searchUsers = async () => {
    if (!input && input.length > 2) return;
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
      <InputGroup>
        <InputLeftElement>
          <Icon as={MdSearch} fontSize="xl" />
        </InputLeftElement>
        <Input
          variant="filled"
          colorScheme="blue"
          placeholder="Search"
          rounded="xl"
          onChange={(e) => {
            setInput(e.target.value);

            searchUsers();
          }}
          _placeholder={{
            fontSize: "md",
          }}
        />
        <InputRightElement>
          <Icon as={MdSort} fontSize="xl" />
        </InputRightElement>
      </InputGroup>
      {loading ? (
        <Box mb={4}>
          <Stack>
            {[0, 1, 3].map((i) => (
              <Skeleton key={`chat:${i}`} height="50px" />
            ))}
          </Stack>
        </Box>
      ) : users?.length ? (
        <Box mb={9}>
          <Stack>
            {users.map((user) => (
              <Flex
                onClick={() => selectUser(user)}
                key={`search:${user.id}`}
                boxShadow="sm"
                align="center"
                padding={2}
                gap={2}
                cursor="pointer"
                borderRadius="md"
                bg="whiteAlpha.50"
                _hover={{
                  bg: colorMode === "dark" ? "whiteAlpha.300" : "gray.50",
                }}
              >
                <Avatar name={user.username ? user.username : "User"} />
                <Text>{user.username}</Text>
              </Flex>
            ))}
          </Stack>
        </Box>
      ) : null}
    </>
  );
};

export default SearchInput;
