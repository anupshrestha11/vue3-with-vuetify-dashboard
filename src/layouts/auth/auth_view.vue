<script setup>
import { useAuthLayoutStore } from "./store";
import { useAuthStore } from "@/modules/login/store";
import { computed } from "vue";
import StatusMessage from "@/components/status-message.vue";
import AuthSidebar from "./auth_sidebar.vue";

const authStore = useAuthStore();
const authLayoutStore = useAuthLayoutStore();

function logout() {
  authStore.logout();
}

const toggle = computed(() => authLayoutStore.toggle);
const rail = computed(() => authLayoutStore.rail);

function toggleDrawer() {
  authLayoutStore.toggleDrawer();
}
function railDrawer(rail) {
  authLayoutStore.railDrawer(rail);
}
</script>

<template>
  <v-layout>
    <v-app-bar color="primary" rail>
      <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
      <v-app-bar-title>Legends</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn icon="mdi-logout" @click="logout"></v-btn>
    </v-app-bar>

    <v-navigation-drawer elevation="2" v-model="toggle" :rail="rail">
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
        title="Admin"
        subtitle="admin@gmail.com"
        nav
        @click="railDrawer(false)"
      >
        <template v-slot:append>
          <v-btn
            variant="text"
            icon="mdi-chevron-left"
            @click.stop="railDrawer(true)"
          ></v-btn>
        </template>
      </v-list-item>

      <v-divider></v-divider>
      <auth-sidebar></auth-sidebar>
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <router-view />
        <status-message></status-message>
      </v-container>
    </v-main>
  </v-layout>
</template>
