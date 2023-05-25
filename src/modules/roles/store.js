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
    editIntex: -1,
    editItem: { ...defaultItem },
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
    },
  },
});
