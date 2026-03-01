import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { AUTH_KEY } from "./constant";

const instanceApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
});

const instanceApiWithToken = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
});

instanceApiWithToken.interceptors.request.use((config) => {
  const data = secureLocalStorage.getItem(AUTH_KEY) as { token: string };
  if (data.token) {
    config.headers.Authorization = `JWT ${data.token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export { instanceApi, instanceApiWithToken };
