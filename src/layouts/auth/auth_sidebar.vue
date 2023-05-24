<script setup>
const sidebarRoutes = [
  {
    title: "Dasboard",
    value: "dashboard",
    pathName: "home",
    icon: "mdi-view-dashboard",
  },
  {
    title: "Users",
    value: "users",
    pathName: "users",
    icon: "mdi-account-multiple-outline",
  },
  {
    title: "Projects",
    value: "projects",
    pathName: "projects",
    icon: "mdi-folder",
  },
  {
    title: "Properties",
    value: "properties",
    pathName: "properties",
    icon: "mdi-google-maps",
  },
  {
    title: "Bookings",
    value: "bookings",
    pathName: "bookings",
    icon: "mdi-cart "
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
