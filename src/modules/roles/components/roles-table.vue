/* eslint-disable */
<script setup>
import { computed, onMounted } from "vue";
import { useRolesStore } from "../store";
import { headers } from "../util";
import { handleError } from "@/utils/error";

const store = useRolesStore();
store.fetchRoles().catch(handleError);
const roles = computed(() => store.roles);

function loadItems()
{
  store.fetchRoles().catch(handleError);
}

function editItem(sn){
  let editItem = roles.value.find((item) => {
    return item.sn === sn;
  });

  store.updateFormTitle("Edit Role");
  store.updateEditItem(editItem);
  store.updateEditIndex(editItem.id);
  store.openDialog();
}

function deleteItem(sn){
  let role = roles.value.find((item) => {
    return item.sn === sn;
  });
  let val = confirm(`Are You Sure You want to delete this (${role.name}) role?`);
  if(val){
      store.deleteRole(role.id).then(loadItems).catch(handleError);
  }
}

</script>

<template>
  <v-card class="mt-4">
    <v-data-table-virtual
      :headers="headers"
      :items="roles"
      :itemsperpage="roles.length"
      :height="roles.length > 12 ? '70vh' : '100%'"
      fixed-header
    >
      <template v-slot:[`item.action`]="{item}">
        <v-tooltip text="Edit Role" location="bottom">
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
        <v-tooltip text="Delete Role" location="bottom">
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
