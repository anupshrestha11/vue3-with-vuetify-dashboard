import { defineStore } from "pinia";
import service from "./service";

export const useUserStore = defineStore("usersPage", {
  state: () => ({
    form: {
      first_name: null,
      middle_name: null,
      last_name: null,
      email: null,
      password: null,
      role: null,
    },
    roles: [],
    users: [],
    usersPagination: null,
  }),
  actions: {
    fetchRoles() {
      return service.fetchRoles().then((response) => {
        this.roles = response.data.data.map((item) => {
          return {
            title: item.name,
            value: item.name,
          };
        });
      });
    },
    addUser(data) {
      return service.addUser(data);
    },
    fetchUsers(data = { page: 1, page_size: 10 }) {
      return service.fetchUsers(data).then((response) => {
        this.users = response.data.data.map((item, idx) => ({
          ...item,
          sn: ++idx,
        }));
        this.usersPagination = response.data.meta;
      });
    },
    clearForm() {
      this.form = {
        first_name: null,
        middle_name: null,
        last_name: null,
        email: null,
        password: null,
        role: null,
      };
    },
  },
});
