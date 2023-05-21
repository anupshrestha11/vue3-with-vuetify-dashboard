import { defineStore } from "pinia";
import service from "./service";

export const useProjectsStore = defineStore("projectsPage", {
  state: () => ({
    form: {
      title: null,
      description: null,
      provinceId: null,
      districtId: null,
      municipalityId: null,
      status: null,
      ward: null,
      tole: null,
      images: null,
    },
    provinces: [],
    districts: [],
    municipalities: [],
    projects: [],
    projectsPagination: null,
  }),
  actions: {
    fetchProvinces() {
      return service.fetchProvinces().then((response) => {
        this.provinces = response.data.map((item) => {
          return {
            title: item.province_name,
            value: item.id,
          };
        });
      });
    },
    fetchDistrices(provinceId) {
      return service.fetchDistricts(provinceId).then((response) => {
        this.districts = response.data.map((item) => {
          return {
            title: item.district_name,
            value: item.id,
          };
        });
      });
    },
    fetchMunicipalities(districtId) {
      return service.fetchMunicipalities(districtId).then((response) => {
        this.municipalities = response.data.map((item) => {
          return {
            title: item.municipality_name,
            value: item.id,
          };
        });
      });
    },
    addProject(data) {
      return service.addProject(data);
    },
    fetchProjects(data = {}) {
      return service.fetchProjects(data).then((response) => {
        this.projects = response.data.data.map((item, idx) => ({
          ...item,
          sn: ++idx,
        }));
        this.projectsPagination = response.data.meta;
      });
    },
    clearForm() {
      this.form = {
        title: null,
        description: null,
        provinceId: null,
        districtId: null,
        municipalityId: null,
        status: null,
        ward: null,
        tole: null,
        images: null,
      };
    },
  },
});
