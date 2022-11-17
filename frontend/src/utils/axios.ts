import axios from "axios";

const BASE_URL = import.meta.env.VITE_SERVER_URL;
export const publicRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
