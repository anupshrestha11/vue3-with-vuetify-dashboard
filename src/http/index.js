import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_HOST,
});

const auth = axios.create({
  baseURL: import.meta.env.VITE_API_HOST,
});

if (auth !== undefined) {
  auth.interceptors.request.use(
    (request) => {
      // TODO: get token from the store
      const token = "";
      request.headers.Authorization =
        token.token_type + " " + token.access_token;
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
