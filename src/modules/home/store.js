import { defineStore } from "pinia";
import service from "./service";

const defaults = {
  availableSlots: 9,
};

export const useHomePageStore = defineStore("homePage", {
  state: () => defaults,
  actions: {
    updateAvailableSlots(payload) {
      this.availableSlots = payload;
    },
    fetchPlots() {
      return service.fetchPlots();
    },
  },
});
