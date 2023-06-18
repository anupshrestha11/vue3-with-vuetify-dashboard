import { defineStore } from "pinia";
import service from "./service";

const defaultItem = {
  property_type: null,
  title: null,
  description: null,
  project_id: null,
  ward: null,
  lot_no: null,
  status: null,
  images: null,
};

export const usePropertiesStore = defineStore("propertiesPage", {
  state: () => ({
    projects: [],
    statuses: [],
    properties: [],
    property: [],
    property_type: [],
    propertiesPagination: null,
    editIndex: null,
    editItem: {...defaultItem},
    dialog: false,
    valid: false,
    formTitle: "Add Property",
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
    
    fetchPropertyTypes(){
      return service.fetchPropertyTypes().then( (response) => {
        this.property_type = response.data.map((item) => {
          return {
            title: item.name,
            value: item.value,
          };
        });
      });
    },
    addProperty(data) {
      return service.addProperty(data);
    },
    updateProperty(id, data)
    {
      return service.updateProperty(id, data);
    },
    fetchProperty(id){
      return service.fetchProperty(id).then((response) =>{
        this.property = response.data.data;
      });
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
    deleteProperty(id)
    {
      return service.deleteProperty(id);
    },
    clearForm() {
      this.editItem = Object.assign({}, defaultItem);
      this.formTitle = "Add Property";
      this.editIndex = null;
    },

    updateFormTitle(title)
    {
      this.formTitle = title;
    },
    updateEditItem(editItem)
    {
        const{
          property_type,
          title,
          description,
          project_id,
          ward,
          lot_no,
          status,
        } = editItem;

        this.editItem ={
          property_type,
          title,
          description,
          project_id,
          ward,
          lot_no,
          status,
        };
    },

    updateEditIndex(id){
      this.editIndex = id;
    },

    openDialog(dialog = true) {
      this.dialog = dialog;
    },
  },
});
