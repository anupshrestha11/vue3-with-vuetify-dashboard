<script setup>
import { useLoginPageStore } from "@/modules/login/store";
import { reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useLoginPageStore();

function logout() {
  authStore.logout().finally(() => {
    router.push("/login");
  });
}

const drawer = reactive({ toggle: false });

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

    <v-navigation-drawer expand-on-hover :rail="drawer.toggle">
      <v-list>
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
          title="Admin"
          subtitle="admin@gmail.com"
        ></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          prepend-icon="mdi-view-dashboard"
          title="Dashboard"
          value="dashboard"
          active=""
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-folder"
          title="Properties"
          value="properties"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-account-multiple"
          title="Users"
          value="users"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-layout>
</template>
