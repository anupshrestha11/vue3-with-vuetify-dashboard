import { defineStore } from "pinia";
import service from "./service";

const defaultItem = {
  title: null,
  description: null,
};

export const usePaymentTypeStore = defineStore("paymentTypePage", {
  state: () => ({
    paymentTypes: [],
    editItem: { ...defaultItem },

  }),
  actions: {
    
    addPaymentType(data) {
      return service.addPaymentType(data);
    },
    fetchPaymentTypes(data = {}) {
      return service.fetchPaymentTypes(data).then((response) => {
        this.paymentTypes = response.data.map((item, idx) => ({
          ...item,
          sn: ++idx,
        }));
      });
    },
    clearForm() {
      this.editItem = Object.assign({}, defaultItem);
    },
  },
});
