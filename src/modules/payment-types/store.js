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
    editIndex: -1,
    dialog: false,
    valid: false,
    formTitle: "Edit Role",

  }),
  actions: {    
    addPaymentType(data) {
      return service.addPaymentType(data);
    },

    updatePaymentType(id, data){
      return service.updatePaymentType(id, data);
    },

    deletePaymentType(id){
      return service.deletePaymentType(id);
    },

    fetchPaymentTypes(data = {}) {
      return service.fetchPaymentTypes(data).then((response) => {
        this.paymentTypes = response.data.map((item, idx) => ({
          title: item.name,
          value: item.value,
          sn: ++idx,
        }));
      });
    },
    clearForm() {
      this.editItem = Object.assign({}, defaultItem);
      this.formTitle = "Add Payment Type";
      this.editIndex = null;
    },

    updateFormTitle(title){
      this.formTitle = title;
    },
    
    updateEditINdex(id){
      this.editIndex = id;
    },

    openDialog(dialog = true){
      this.dialog = dialog;
    }

  },
});
