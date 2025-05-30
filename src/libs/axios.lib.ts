import { refreshToken, logout } from "@/requests";
import { handleError } from "@/utils";
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

// API instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;

// Refresh token and retry queue
interface RetryQueueItem {
  resolve: (value: AxiosResponse) => void;
  reject: (error: AxiosError) => void;
  config: AxiosRequestConfig;
}

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let isRefreshing = false;
const refreshAndRetryQueue: RetryQueueItem[] = [];

const processQueue = (error: AxiosError | null = null) => {
  refreshAndRetryQueue.forEach(({ config, resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      api.request(config).then(resolve).catch(reject);
    }
  });
  refreshAndRetryQueue.length = 0;
};

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (
      (error.response?.data as { errorCode: string })?.errorCode ===
        "ACCESS_TOKEN_EXPIRED" &&
      !originalRequest._retry
    ) {
      if (!isRefreshing) {
        isRefreshing = true;
        originalRequest._retry = true;

        try {
          await refreshToken();
          processQueue();
          return api(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError as AxiosError);
          handleError(refreshError, "Session expired, logging out...");
          window.location.href = "/login";
          await logout(); // logout session
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return new Promise<AxiosResponse>((resolve, reject) => {
        refreshAndRetryQueue.push({ config: originalRequest, resolve, reject });
      });
    }

    return Promise.reject(error);
  }
);
