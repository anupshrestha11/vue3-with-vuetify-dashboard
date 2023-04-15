import axios from "axios";
import { useAuthStore } from "@/modules/login/store";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_HOST,
});

const auth = axios.create({
  baseURL: import.meta.env.VITE_API_HOST,
});

function authHeader(request) {
  const { user } = useAuthStore();
  const isLoggedIn = !!user?.token;

  if (isLoggedIn) {
    request.headers.Authorization = `Bearer ${user.token}`;
  }
}

if (auth !== undefined) {
  auth.interceptors.request.use(
    (request) => {
      authHeader(request);
      return request;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  auth.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
}

if (import.meta.env.DEV) {
  http.interceptors.request.use((request) => {
    console.log("Public SENT:", request);

    return request;
  });

  http.interceptors.response.use((response) => {
    console.log("Public RECEIVED:", response);

    return response;
  });

  if (auth !== undefined) {
    auth.interceptors.request.use((request) => {
      console.log("Authorized SENT:", request);
      return request;
    });

    auth.interceptors.response.use((response) => {
      console.log("Authorized RECEIVED:", response);

      return response;
    });
  }
}

export { http, auth };
