import { defineStore } from "pinia";
import service from "./service";

const defaultItem = {
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

export const useProjectsStore = defineStore("projectsPage", {
  state: () => ({
    provinces: [],
    districts: [],
    municipalities: [],
    projects: [],
    project:[],
    projectStatus:[],
    projectsPagination: null,
    editIndex: null,
    editItem: { ...defaultItem },
    dialog: false,
    valid: false,
    formTitle: "Add Project",
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
    fetchProjectStatus(){
      return service.fetchProjectStatus().then( (response) => {
        this.projectStatus = response.data.map( (item) => {
          return {
            title: item.name,
            value: item.value, 
          };
        });
      });
    },
    addProject(data) {
      return service.addProject(data);
    },
    updateProject(id, data) {
      return service.updateProject(id, data);
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
    deleteProject(id) {
      return service.deleteProject(id);
    },
    fetchSingleProject(id){
      return service.fetchSingleProject(id).then((response) => {
        this.project = response.data.data;
      });
    },
    clearForm() {
      this.editItem = Object.assign({}, defaultItem);
      this.formTitle = "Add Project";
      this.editIndex = null;
    },
    updateFormTitle(title) {
      this.formTitle = title;
    },
    updateEditItem(editItem) {
      const {
        title,
        description,
        province_id: provinceId,
        district_id: districtId,
        municipality_id: municipalityId,
        ward,
        tole,
        status,
      } = editItem;
      this.editItem = {
        title,
        description,
        provinceId,
        districtId,
        municipalityId,
        ward,
        tole,
        status,
      };
    },
    updateEditIndex(id) {
      this.editIndex = id;
    },
    openDialog(dialog = true) {
      this.dialog = dialog;
    },
  },
});
