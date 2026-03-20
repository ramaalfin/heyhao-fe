import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { AUTH_ADMIN_KEY, AUTH_KEY } from "./constant";

const instanceApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
});

const instanceApiWithToken = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
});

const instanceApiWithTokenAdmin = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
});

// Request interceptor to add token
instanceApiWithToken.interceptors.request.use(
  (config) => {
    const data = secureLocalStorage.getItem(AUTH_KEY) as { 
      token: string;
      refreshToken?: string;
    };
    if (data?.token) {
      config.headers.Authorization = `JWT ${data.token}`;
      if (data.refreshToken) {
        config.headers["X-Refresh-Token"] = data.refreshToken;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor to handle token refresh
instanceApiWithToken.interceptors.response.use(
  (response) => {
    // Check if new tokens are provided in response headers
    const newAccessToken = response.headers["x-new-access-token"];
    const newRefreshToken = response.headers["x-new-refresh-token"];

    if (newAccessToken && newRefreshToken) {
      const data = secureLocalStorage.getItem(AUTH_KEY) as any;
      if (data) {
        secureLocalStorage.setItem(AUTH_KEY, {
          ...data,
          token: newAccessToken,
          refreshToken: newRefreshToken,
        });
      }
    }

    return response;
  },
  (error) => {
    // If token refresh failed, clear auth and redirect to login
    if (error.response?.status === 401) {
      const errorMessage = error.response?.data?.message || "";
      if (errorMessage.includes("refresh token") || errorMessage.includes("expired")) {
        secureLocalStorage.removeItem(AUTH_KEY);
        window.location.href = "/sign-in";
      }
    }
    return Promise.reject(error);
  },
);

instanceApiWithTokenAdmin.interceptors.request.use(
  (config) => {
    const data = secureLocalStorage.getItem(AUTH_ADMIN_KEY) as {
      token: string;
      refreshToken?: string;
    };
    if (data?.token) {
      config.headers.Authorization = `JWT ${data.token}`;
      if (data.refreshToken) {
        config.headers["X-Refresh-Token"] = data.refreshToken;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor for admin token refresh
instanceApiWithTokenAdmin.interceptors.response.use(
  (response) => {
    const newAccessToken = response.headers["x-new-access-token"];
    const newRefreshToken = response.headers["x-new-refresh-token"];

    if (newAccessToken && newRefreshToken) {
      const data = secureLocalStorage.getItem(AUTH_ADMIN_KEY) as any;
      if (data) {
        secureLocalStorage.setItem(AUTH_ADMIN_KEY, {
          ...data,
          token: newAccessToken,
          refreshToken: newRefreshToken,
        });
      }
    }

    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      const errorMessage = error.response?.data?.message || "";
      if (errorMessage.includes("refresh token") || errorMessage.includes("expired")) {
        secureLocalStorage.removeItem(AUTH_ADMIN_KEY);
        window.location.href = "/admin/sign-in";
      }
    }
    return Promise.reject(error);
  },
);

export { instanceApi, instanceApiWithToken, instanceApiWithTokenAdmin };
