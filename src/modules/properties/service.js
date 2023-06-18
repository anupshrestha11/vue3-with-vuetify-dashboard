import { http } from "@/http";
import { commonErrorHandler } from "@/utils";

function fetchProjects() {
  return http.get("project").catch(commonErrorHandler);
}

function fetchStatuses()
{
    return http.get("status").catch(commonErrorHandler);
}

function addProperty(data) {
  return http
    .post("/property", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .catch(commonErrorHandler);
}

function updateProperty(id, data)
{
  return http
  .put(`/property/${id}`, data, {
    headers: {
      "Content-Type": "application/json"
    }
  })
  .catch(commonErrorHandler);
}

function deleteProperty(id){
 return http.delete(`/property/${id}`).catch(commonErrorHandler);
}
function fetchPropertyTypes(){
  return http.get("/property-types").catch(commonErrorHandler);
}
function fetchProperty(id){
  return http.get(`/property/${id}`).catch(commonErrorHandler);
}

function fetchProperties(data) {
  return http.get("/property", { params: data }).catch(commonErrorHandler);
}

export default {
  fetchProjects,
  fetchStatuses,
  addProperty,
  fetchProperties,
  updateProperty,
  deleteProperty,
  fetchPropertyTypes,
  fetchProperty,
};
