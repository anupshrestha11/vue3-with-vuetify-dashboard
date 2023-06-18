import { http } from "@/http";
import { commonErrorHandler } from "@/utils";


function addPaymentType(data) {
  return http
    .post("/payment-type", data)
    .catch(commonErrorHandler);
}
function fetchPaymentTypes(data) {
  return http.get("/payment-types", { params: data }).catch(commonErrorHandler);
}

export default {
  addPaymentType,
  fetchPaymentTypes,
};
