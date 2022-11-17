import { publicRequest } from "../utils/axios";
import useAuth from "./useAuth";

const useRefresh = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const { data } = await publicRequest.get("/api/auth/refresh", {
      withCredentials: true,
    });
    setAuth({
      accessToken: data.accessToken,
      user: data.user,
    });

    const token = data.accessToken;

    return token;
  };

  return refresh;
};

export default useRefresh;
