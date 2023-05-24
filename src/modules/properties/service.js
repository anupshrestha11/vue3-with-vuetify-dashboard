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
function fetchProperties(data) {
  return http.get("/property", { params: data }).catch(commonErrorHandler);
}

export default {
  fetchProjects,
  fetchStatuses,
  addProperty,
  fetchProperties,
};
