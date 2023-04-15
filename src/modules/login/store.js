import { defineStore } from "pinia";
import service from "./service";
import router from "@/router";

const defaults = {
  user: JSON.parse(localStorage.getItem("user")),
  returnUrl: null,
};

export const useAuthStore = defineStore("auth", {
  state: () => defaults,
  actions: {
    async login(email, password) {
      const response = await service.login({
        email: email,
        password: password,
      });
      const user = response.data;
      localStorage.setItem("user", JSON.stringify(user));
      router.push(this.returnUrl || "/");
    },
    async logout() {
      try {
        return await service.logout();
      } finally {
        this.user = null;
        localStorage.removeItem("user");
        router.push("/");
      }
    },
  },
});
