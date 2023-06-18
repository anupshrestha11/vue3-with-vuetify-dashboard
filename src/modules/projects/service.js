import { http } from "@/http";
import { commonErrorHandler } from "@/utils";

function fetchProvinces() {
  return http.get("province").catch(commonErrorHandler);
}

function fetchDistricts(province_id = null) {
  return http
    .get("district", { params: { province_id } })
    .catch(commonErrorHandler);
}

function fetchMunicipalities(district_id = null) {
  return http
    .get("municipality", { params: { district_id } })
    .catch(commonErrorHandler);
}

function addProject(data) {
  return http
    .post("/project", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .catch(commonErrorHandler);
}

function updateProject(id, data) {
  return http
    .put(`/project/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .catch(commonErrorHandler);
}

function fetchProjects(data) {
  return http.get("/project", { params: data }).catch(commonErrorHandler);
}

function fetchSingleProject(id)
{
  return http.get(`/project/${id}`).catch(commonErrorHandler);
}

function fetchProjectStatus(){
  return http.get("/projectStatus").catch(commonErrorHandler);
}

function deleteProject(id) {
  return http.delete(`/project/${id}`).catch(commonErrorHandler);
}

export default {
  fetchProvinces,
  fetchDistricts,
  fetchMunicipalities,
  addProject,
  fetchProjects,
  deleteProject,
  updateProject,
  fetchSingleProject,
  fetchProjectStatus,
};
