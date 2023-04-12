import { auth } from "@/http";

function fetchPlots() {
  return auth.get("plots");
}

export default {
  fetchPlots,
};
