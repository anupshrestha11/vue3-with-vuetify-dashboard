<script setup>
import { handleError } from "@/utils/error";
import { useUserStore } from "../store";
import { reactive } from "vue";
import { computed } from "vue";

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
  // {
  //   title: "Email",
  //   key: "email",
  // },
  // {
  //   title: "Role",
  //   key: "role",
  // },
  // {
  //   title: "User Since",
  //   key: "created_at",
  // },
  {
    title: "Actions",
    align: "center",
  },
];

const store = useUserStore();
const state = reactive({
  loading: false,
  serverItems: computed(() => store.users),
  totalItems: computed(() => store.usersPagination?.total),
  itemsPerPage: 10,
});

function loadItems({ page, itemsPerPage, sortBy }) {
  state.loading = true;
  store
    .fetchUsers({ page, itemsPerPage, sortBy })
    .catch(handleError)
    .finally(() => {
      state.loading = false;
    });
}
</script>

<template>
  <v-data-table-server
    v-model:items-per-page="state.itemsPerPage"
    :headers="headers"
    :items-length="state.totalItems"
    :items="state.serverItems"
    :loading="state.loading"
    class="elevation-1"
    item-value="name"
    @update:options="loadItems"
  >
  </v-data-table-server>
</template>
