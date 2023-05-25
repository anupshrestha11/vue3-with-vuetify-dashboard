/* eslint-disable */
<script setup>
import { computed } from "vue";
import { useRolesStore } from "../store";
import { headers } from "../util";
import { handleError } from "@/utils/error";

const store = useRolesStore();
store.fetchRoles().catch(handleError);
const roles = computed(() => store.roles);
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
      <template v-slot:[`item.action`]="{}">
        <v-tooltip text="Edit Role" location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              icon="mdi-pencil"
              variant="tonal"
              size="x-small"
              class="mx-2"
              color="warning"
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
            ></v-btn>
          </template>
        </v-tooltip>
      </template>
    </v-data-table-virtual>
  </v-card>
</template>
