import axios from "axios";
import store from "../store";

axios.defaults.withCredentials = true;

export const injectStore = (_store: typeof store) => {
  return _store;
};
export const baseAuthenticatedInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const authenticatedInstance = axios.create({
  ...baseAuthenticatedInstance.options,
});

authenticatedInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const url = new URL(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`
      );
      const response = await axios.get(url.toString());
      const { accessToken } = response.data.resource;
      originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
      const _store = injectStore(store);
      _store.dispatch({
        type: "users/setUser",
        payload: { accessToken },
      });
      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);
