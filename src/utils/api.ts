import axios from "axios";
import store from "../store";
import { AUTH_FIELDS } from "../constants/auth";

export const injectStore = (_store: typeof store) => {
  return _store;
};

const authenticatedInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
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
      const response = await axios.post(url.toString(), undefined, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const accessToken = response.data.accessToken;
      originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
      const _store = injectStore(store);
      _store.dispatch({
        type: "users/updateUser",
        payload: { property: AUTH_FIELDS.ACCESS_TOKEN, value: accessToken },
      });
      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default authenticatedInstance;
