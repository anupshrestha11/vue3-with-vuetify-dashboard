<script setup>
import { useAuthStore } from "@/modules/login/store";
import { reactive } from "vue";
import StatusMessage from "@/components/status-message.vue";
import AuthSidebar from "./auth_sidebar.vue";

const authStore = useAuthStore();

function logout() {
  authStore.logout();
}

const drawer = reactive({ toggle: true, rail: false });

function toggleDrawer() {
  drawer.toggle = !drawer.toggle;
}
</script>

<template>
  <v-layout>
    <v-app-bar color="primary" rail>
      <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
      <v-app-bar-title>Legends</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn prepend-icon="mdi-logout" variant="flat" @click="logout"
        >Logout</v-btn
      >
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer.toggle"
      :rail="drawer.rail"
      @click="drawer.rail = false"
    >
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
        title="Admin"
        subtitle="admin@gmail.com"
        nav
      >
        <template v-slot:append>
          <v-btn
            variant="text"
            icon="mdi-chevron-left"
            @click.stop="drawer.rail = !drawer.rail"
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
