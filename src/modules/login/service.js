import { http } from "@/http";
import { commonErrorHandler } from "@/utils";

function login(data) {
  return http.post("login", data).catch(commonErrorHandler);
}

function logout() {
  return http.post("logout").catch(commonErrorHandler);
}

export default {
  login,
  logout,
};
