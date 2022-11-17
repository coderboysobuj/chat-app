import { AxiosRequestConfig } from "axios";
import { useEffect } from "react";
import { axiosPrivate } from "../utils/axios";
import useAuth from "./useAuth";
import useRefresh from "./useRefresh";

const useAxios = () => {
  const refresh = useRefresh();
  const { session } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        if (config.headers && !config.headers?.authorization) {
          config.headers.authorization = `Bearer ${session?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAceessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAceessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosPrivate.interceptors.response.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [session, refresh]);

  return axiosPrivate;
};

export default useAxios;
