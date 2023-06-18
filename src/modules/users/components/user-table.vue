<script setup>
import { computed } from "vue";
import { useUserStore } from "../store";
import { headers } from "../util";
import { handleError } from "@/utils/error";
import router from "@/router";


const store = useUserStore();
  store.fetchUsers().catch(handleError);
  const users = computed(() => store.users);

  function loadItems(){
    store.fetchUsers().catch(handleError);
  }

  function editItem(sn){
    let editItem = users.value.find((item) => {
      return item.sn === sn;
    });
     store.updateFormTitle("Edit User");
     store.updateEditItem(editItem);
     store.updateEditIndex(editItem.id);
     store.openDialog();
  }

  function deleteItem(sn){
    let user = users.value.find((item) => {
      return item.sn === sn;
    });
    let val = confirm(`Are You sure you want to delete this (${user.first_name}) user?`);
    if(val){
      store.deleteUser(user.id).then(loadItems).catch(handleError);
    }
  }

  function viewUser(sn){
    let user = users.value.find( (item) => {
      return item.sn === sn;
    });
    router.push(`/user-details/${user.id}`);
  }
</script>

<template>
  <v-card class="mt-4">
    <v-data-table-virtual
      :headers="headers"
      :items="users"
      :itemsperpage="users.length"
      :height="users.length > 12 ? '70vh' : '100%'"
      fixed-header
    >
      <template v-slot:[`item.action`]="{item}">
        <v-tooltip text="View Project" location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              icon="mdi-eye"
              variant="tonal"
              size="x-small"
              color="info"
              @click.stop="viewUser(item.columns.sn)"
            ></v-btn>
          </template>
        </v-tooltip>

        <v-tooltip text="Edit User" location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              icon="mdi-pencil"
              variant="tonal"
              size="x-small"
              class="mx-2"
              color="warning"
              @click.stop = "editItem(item.columns.sn)"
            ></v-btn>
          </template>
        </v-tooltip>
        <v-tooltip text="Delete User" location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              icon="mdi-trash-can"
              variant="tonal"
              size="x-small"
              color="red"
              @click.stop = "deleteItem(item.columns.sn)"
            ></v-btn>
          </template>
        </v-tooltip>
      </template>
    </v-data-table-virtual>
  </v-card>
</template>

