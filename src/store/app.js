// Utilities
import { defineStore } from "pinia";
import { useAuthStore } from "@/modules/login/store";

export const useAppStore = defineStore("app", {
  auth: useAuthStore(),
});
