import { http } from "@/http";
import { commonErrorHandler } from "@/utils";


function fetchPermissions()
{
  return http.get("/permission").catch(commonErrorHandler);
}

function addRole(data) {
  return http
    .post("/role", data)
    .catch(commonErrorHandler);
}
function fetchRoles(data) {
  return http.get("/role", { params: data }).catch(commonErrorHandler);
}

export default {
  addRole,
  fetchRoles,
  fetchPermissions,
};
