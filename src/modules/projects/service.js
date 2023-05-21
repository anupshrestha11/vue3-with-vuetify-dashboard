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
function fetchProjects(data) {
  return http.get("/project", { params: data }).catch(commonErrorHandler);
}

export default {
  fetchProvinces,
  fetchDistricts,
  fetchMunicipalities,
  addProject,
  fetchProjects,
};
