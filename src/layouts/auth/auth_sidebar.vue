<script setup>
const sidebarRoutes = [
  {
    title: "Dasboard",
    value: "dashboard",
    pathName: "home",
    icon: "mdi-view-dashboard",
  },
  {
    title: "Projects",
    value: "projects",
    pathName: "projects",
    icon: "mdi-folder",
  },
];
</script>

<template>
  <v-list density="compact" nav>
    <v-list-item
      v-for="route in sidebarRoutes"
      :key="route.title"
      :prepend-icon="route.icon"
      :title="route.title"
      :value="route.value"
      :to="{ name: route.pathName }"
    ></v-list-item>
  </v-list>
</template>
