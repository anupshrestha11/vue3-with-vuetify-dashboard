import { auth } from "@/http";

function login(data) {
  return auth.post("login", data).catch((error) => {
    alert(error.response.status);
  });
}

function logout() {
  return auth.post("logout").catch((error) => {
    alert(error.response.status);
  });
}

export default {
  login,
  logout,
};
