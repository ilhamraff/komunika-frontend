import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { AUTH_KEY } from "./constant";
import type { SignUpResponse } from "../../features/auth/api/signUp";

const instanceApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
});

export const instanceApiToken = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
});

instanceApiToken.interceptors.request.use(
  (config) => {
    const data = secureLocalStorage.getItem(AUTH_KEY) as SignUpResponse;

    if (data.token) {
      config.headers.Authorization = `JWT ${data.token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instanceApi;
