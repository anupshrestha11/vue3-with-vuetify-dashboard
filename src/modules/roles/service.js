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

function updateRole(id, data)
{
  return http
    .put(`/role/${id}`, data, {
        headers: {
          "Content-Type" : "application/json"
        }
    }).catch(commonErrorHandler);
}

function deleteRole(id)
{
  return http.delete(`/role/${id}`).catch(commonErrorHandler);
}


function fetchRoles(data) {
  return http.get("/role", { params: data }).catch(commonErrorHandler);
}

export default {
  addRole,
  fetchRoles,
  fetchPermissions,
  updateRole,
  deleteRole,
};
