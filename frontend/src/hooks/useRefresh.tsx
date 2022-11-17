import axios from "axios";
import React from "react";
import { publicRequest } from "../utils/axios";
import useAuth from "./useAuth";

const useRefresh = () => {
  const { setAuthStateValue } = useAuth();

  const refresh = async () => {
    const response = await publicRequest.get("/api/auth/refresh", {
      withCredentials: true,
    });
    setAuthStateValue({
      session: {
        accessToken: response.data.accessToken,
        user: response.data.user,
      },
    });
    return {
      accessToken: response.data.accessToken,
    };
  };

  return refresh;
};

export default useRefresh;
