import { defineStore } from "pinia";
import service from "./service";

export const usePropertiesStore = defineStore("propertiesPage", {
  state: () => ({
    form: {
      propertyType: null,
      title: null,
      description: null,
      projectId: null,
      ward: null,
      lotNo:null,
      status: null,
      images: null,
    },
    projects: [],
    statuses: [],
    properties: [],
    propertiesPagination: null,
  }),
  actions: {
    fetchProjects() {
      return service.fetchProjects().then((response) => {
        this.projects = response.data.data.map((item) => {
          return {
            title: item.title,
            value: item.id,
          };
        });
      });
    },
    fetchStatuses() {
      return service.fetchStatuses().then((response) => {
        this.statuses = response.data.map((item) => {
          return {
            title: item.name,
            value: item.id,
          };
        });
      });
    },
    
    addProperty(data) {
      return service.addProperty(data);
    },
    fetchProperties(data = {}) {
      return service.fetchProperties(data).then((response) => {
        this.properties = response.data.data.map((item, idx) => ({
          ...item,
          sn: ++idx,
        }));
        this.propertiesPagination = response.data.data.meta;
      });
    },
    clearForm() {
      this.form = {
        propertyType: null,
        title: null,
        description: null,
        projectId: null,
        ward: null,
        lotNo:null,
        status: null,
        images: null,
      };
    },
  },
});
