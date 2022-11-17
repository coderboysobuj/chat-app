import { Button, Center, Icon, Stack, Text } from "@chakra-ui/react";
import { MdArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
const Welcome = () => {
  return (
    <Center height="100vh">
      <Link to="/login">
        <Button variant="solid" colorScheme="blue">
          Get stated
        </Button>
      </Link>
    </Center>
  );
};

export default Welcome;
