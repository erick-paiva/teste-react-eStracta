import axiosInstance, { AxiosError } from "axios";

import { cookies } from "@/utils";
import { VITE_API_URL } from "@/config";

const config = {
  baseURL: VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

const authenticatedInstance = axiosInstance.create(config);

const unathenticatedInstance = axiosInstance.create(config);

unathenticatedInstance.interceptors.response.use(
  (response) => response?.data,
  async (error: AxiosError) => await Promise.reject(error)
);

authenticatedInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error: AxiosError) => {
    if (error.response) {
      if (error.response.status !== 401 && error.response.status !== 403) {
        return await Promise.reject(error);
      }
    }
  }
);

export default {
  unauthorized() {
    unathenticatedInstance.defaults.baseURL = VITE_API_URL;

    return unathenticatedInstance;
  },
  authorized() {
    authenticatedInstance.defaults.headers.common.Authorization =
      cookies.getAccess() as string;

    authenticatedInstance.interceptors.request.use(
      function (config) {
        config.baseURL = VITE_API_URL;

        return config;
      },
      async function (error): Promise<unknown> {
        return await Promise.reject(error);
      }
    );

    return authenticatedInstance;
  },
};
