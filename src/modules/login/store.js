import { defineStore } from "pinia";
import service from "./service";
import router from "@/router";
import { handleError } from "@/utils/error";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")),
    returnUrl: null,
  }),
  actions: {
    login(email, password) {
      return service
        .login({
          email: email,
          password: password,
        })
        .then((response) => {
          const user = response.data;
          this.user = user;
          localStorage.setItem("user", JSON.stringify(user));
          router.push(this.returnUrl || { name: "home" });
        })
    },
    async logout() {
      return service.logout().finally(() => {
        this.user = null;
        localStorage.removeItem("user");
        router.push("/login");
      });
    },
  },
});
