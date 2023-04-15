import { http } from "@/http";

function fetchPlots() {
  return http.get("plots");
}

export default {
  fetchPlots,
};
