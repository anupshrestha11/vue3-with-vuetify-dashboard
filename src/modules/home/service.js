import { http } from "@/http";
import { commonErrorHandler } from "@/utils";

function fetchProjects() {
  return http.get("/project").catch(commonErrorHandler);
}

export default {
  fetchProjects,
};
