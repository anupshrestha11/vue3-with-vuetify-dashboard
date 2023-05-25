import { http } from "@/http";
import { commonErrorHandler } from "@/utils";

function fetchRoles() {
  return http.get("/role").catch(commonErrorHandler);
}

function addUser(data) {
  return http
    .post("/user", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .catch(commonErrorHandler);
}

function fetchUsers(data) {
  return http.get("/user", { params: data }).catch(commonErrorHandler);
}

export default {
  fetchRoles,
  addUser,
  fetchUsers,
};