import React from "react";
import { useRecoilState } from "recoil";
import authState from "../atoms/auth";

const useAuth = () => {
  const [authStateValue, setAuthStateValue] = useRecoilState(authState);

  return {
    authStateValue,
    setAuthStateValue,
  };
};

export default useAuth;
