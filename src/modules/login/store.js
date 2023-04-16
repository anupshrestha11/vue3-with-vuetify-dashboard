import { defineStore } from "pinia";
import service from "./service";
import router from "@/router";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")),
    returnUrl: null,
  }),
  actions: {
    async login(email, password) {
      const response = await service.login({
        email: email,
        password: password,
      });

      const user = response.data;
      this.user = user;
      localStorage.setItem("user", JSON.stringify(user));
      router.push(this.returnUrl || { name: "home" });
    },
    async logout() {
      try {
        return await service.logout();
      } finally {
        this.user = null;
        localStorage.removeItem("user");
        router.push("/login");
      }
    },
  },
});
