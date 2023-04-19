import { http } from "@/http";
import { commonErrorHandler } from "@/utils";

function fetchPlots() {
  return http.get("plots").catch(commonErrorHandler);
}

export default {
  fetchPlots,
};
