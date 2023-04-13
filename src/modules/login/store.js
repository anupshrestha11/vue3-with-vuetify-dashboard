import { defineStore } from "pinia";
import service from "./service";

const defaults = {};

export const useLoginPageStore = defineStore("login", {
  state: () => defaults,
  actions: {
    login(email, password) {
      return service.login({
        email: email,
        password: password,
      });
    },
    logout() {
      return service.logout();
    },
  },
});
