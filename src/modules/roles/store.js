import { defineStore } from "pinia";
import service from "./service";

const defaultItem = {
  name: null,
  permission: [],
};

export const useRolesStore = defineStore("rolesPage", {
  state: () => ({
    roles: [],
    permissions: [],
    editIndex: -1,
    editItem: { ...defaultItem },
    dialog: false,
    valid: false,
    formTitle: "Add Role",

  }),
  actions: {
    fetchPermissions() {
      return service.fetchPermissions().then((response) => {
        this.permissions = response.data.data.map((item) => {
          return {
            title: item.name,
            value: item.id,
          };
        });
      });
    },
    addRole(data) {
      return service.addRole(data);
    },
    updateRole(id, data){
      return service.updateRole(id, data);
    },

    deleteRole(id){
      return service.deleteRole(id);
    },

    fetchRoles(data = {}) {
      return service.fetchRoles(data).then((response) => {
        this.roles = response.data.data.map((item, idx) => ({
          ...item,
          sn: ++idx,
        }));
      });
    },
    clearForm() {
      this.editItem = Object.assign({}, defaultItem);
      this.formTitle = "Add Role";
      this.editIndex = null;
    },

    updateFormTitle(title){
      this.formTitle = title;
    },

    updateEditItem(editItem)
    {
      const{
          name,
          permission,
      } = editItem;

      this.editItem ={
        name,
        permission,
      }
    },

    updateEditIndex(id){
      this.editIndex = id;
    },

    openDialog(dialog = true){
      this.dialog = dialog;
    }
  },
});
