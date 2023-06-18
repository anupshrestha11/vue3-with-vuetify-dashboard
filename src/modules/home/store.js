import { defineStore } from "pinia";
import service from "./service";

const defaults = {
  availableSlots: 9,
  projects: [],
};

export const useHomePageStore = defineStore("homePage", {
  state: () => defaults,
  actions: {
    updateAvailableSlots(payload) {
      this.availableSlots = payload;
    },
    fetchProjects() {
      return service.fetchProjects().then((response) => {
        return this.projects = response.data.data.map((item)=> {
          return{
              title: item.title,
              id: item.id,
              district: item.district,
              status: item.status,
              image_url: item.images[0]['image_url']  
            };
        });
      });
    },
  },
});
