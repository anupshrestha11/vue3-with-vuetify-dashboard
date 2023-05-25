<script setup>
import { handleError } from "@/utils/error";
import { useUserStore } from "../store";
import { reactive } from "vue";
import { computed } from "vue";
import { onMounted } from "vue";

const headers = [
  {
    title: "S/N",
    align: "center",
    key: "sn",
    width: 100,
    sortable: false,
  },
  {
    title: "User Name",
    key: "full_name",
    sortable: false,
  },
  {
    title: "Email",
    key: "email",
    sortable: false,
  },
  {
    title: "Role",
    key: "role",
    sortable: false,
  },
  {
    title: "Created at",
    key: "created_at",
    sortable: false,
  },
  {
    title: "Actions",
    align: "center",
    sortable: false,
  },
];

const store = useUserStore();
const state = reactive({
  loading: false,
  serverItems: computed(() => store.users),
  totalItems: computed(() => store.usersPagination?.total),
  itemsPerPage: 10,
  current_page: 1,
  searchText: "",
});

function loadItems({ page, itemsPerPage, sortBy }) {
  state.loading = true;
  store
    .fetchUsers({
      page,
      page_size: itemsPerPage,
      sort_by: sortBy,
      search_text: state.searchText,
    })
    .catch(handleError)
    .finally(() => {
      state.loading = false;
    });
}

// function loadItemsByPage(page) {
//   const itemsPerPage = state.itemsPerPage;
//   loadItems({ page, itemsPerPage });
// }

// function loadItemsByPageSize(pageSize) {
//   const page = state.current_page;
//   const itemsPerPage = pageSize;
//   loadItems({ page, itemsPerPage });
// }

const paginationOptions = [
  {
    title: "10",
    value: 10,
  },
  {
    title: "25",
    value: 25,
  },
  {
    title: "50",
    value: 50,
  },
  {
    title: "100",
    value: 100,
  },
];
</script>

<template>
  <v-card>
    <v-card-text>
      <container>
        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="3">
            <v-text-field
              label="Search"
              v-model="state.searchText"
            ></v-text-field>
          </v-col>
        </v-row>
      </container>
      <v-data-table-server
        v-model:items-per-page="state.itemsPerPage"
        :headers="headers"
        :items-length="state.totalItems"
        :items="state.serverItems"
        :loading="state.loading"
        item-value="name"
        @update:options="loadItems"
        :items-per-page-options="paginationOptions"
        :height="state.serverItems.length > 10 ? '70vh' : '100%'"
        fixed-header
      >
      </v-data-table-server>
    </v-card-text>
  </v-card>
</template>
