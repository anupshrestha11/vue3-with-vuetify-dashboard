import { defineStore } from "pinia";

export const useAuthLayoutStore = defineStore("authLayout", {
  state: () => ({
    toggle: JSON.parse(localStorage.getItem("toggle")),
    rail: JSON.parse(localStorage.getItem("rail")),
    returnUrl: null,
  }),
  actions: {
    toggleDrawer() {
      this.toggle = !this.toggle
      localStorage.setItem("toggle", JSON.stringify(this.toggle));
    },
    railDrawer(rail= false) {
      this.rail = rail
      localStorage.setItem("rail", JSON.stringify(this.rail));
    },
  },
});
