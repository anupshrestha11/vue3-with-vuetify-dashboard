import { http } from "@/http";

function login(data) {
  return http.post("login", data).catch((error) => {
    console.log(error);
  });
}

function logout() {
  return http.post("logout").catch((error) => {
    console.log(error.response);
  });
}

export default {
  login,
  logout,
};
