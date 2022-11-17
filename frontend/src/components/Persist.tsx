import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRefresh from "../hooks/useRefresh";
import { useState, useEffect } from "react";
import { Center, Spinner } from "@chakra-ui/react";

const Persist = () => {
  const refresh = useRefresh();
  const { session } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error: any) {
      } finally {
        setLoading(false);
      }
    };

    !session?.accessToken ? verifyRefreshToken() : setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <Center height="100vh">
          <Spinner size="xl" />
        </Center>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default Persist;
