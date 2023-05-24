<script setup>
import { computed } from "vue";
import { useUserStore } from "../store";

const headers = [
  {
    title: "S/N",
    align: "center",
    key: "sn",
    width: 100,
  },
  {
    title: "User Name",
    key: "full_name",
  },
  {
    title: "Email",
    key:"email",
  },
  {
    title: "Role",
    key:"role",
  },
  {
    title: "User Since",
    key: "created_at",
  },
  {
    title: "Actions",
    align: "center",
  },
];

const store = useUserStore();
store.fetchUsers();
const users = computed(() => store.users);
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="users"
    :itemsperpage="users.length"
  >
  </v-data-table>
</template>

