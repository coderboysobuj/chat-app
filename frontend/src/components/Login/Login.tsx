import {
  Stack,
  InputGroup,
  InputLeftElement,
  Icon,
  Input,
  Button,
} from "@chakra-ui/react";
import React, { FormEvent, useState } from "react";
import { MdPerson, MdLock } from "react-icons/md";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { publicRequest } from "../../utils/axios";
import useAuth from "../../hooks/useAuth";
const Login: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setAuthStateValue } = useAuth();
  const navigate = useNavigate();
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await publicRequest.post("/api/auth/login", {
        username,
        password,
      });
      toast.success(response.data.message);
      setAuthStateValue({
        session: {
          accessToken: response.data.accessToken,
          user: response.data.user,
        },
      });
      navigate("/app");
    } catch (error: any) {
      if (!error.response || !error.response?.data) {
        toast.error("Netword error");
      } else {
        toast.error(error?.response?.data.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleLogin}>
      <Stack spacing={5}>
        <InputGroup>
          <InputLeftElement>
            <Icon as={MdPerson} />
          </InputLeftElement>
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </InputGroup>
        <InputGroup>
          <InputLeftElement>
            <Icon as={MdLock} />
          </InputLeftElement>
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputGroup>
        <Button
          type="submit"
          variant="solid"
          colorScheme="blue"
          isLoading={loading}
        >
          Login
        </Button>
      </Stack>
    </form>
  );
};

export default Login;
