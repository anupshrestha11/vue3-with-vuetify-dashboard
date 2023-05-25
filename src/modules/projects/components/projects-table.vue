<script setup>
import { computed } from "vue";
import { useProjectsStore } from "../store";
import { headers, projectsStatus } from "../util";
import { handleError } from "@/utils/error";

const store = useProjectsStore();
store.fetchProjects().catch(handleError);
const projects = computed(() => store.projects);

function editItem(sn) {
  let editItem = projects.value.find((item) => {
    return item.sn === sn;
  });
  // TODO: Remove this line
  return editItem;
  // TODO: Update form title
  // TODO: Update Edit Index
  // TODO: update Edit Item
  // TODO: Open Action Dialog
}
</script>

<template>
  <v-card class="mt-4">
    <v-data-table-virtual
      :headers="headers"
      :items="projects"
      :itemsperpage="projects.length"
      :height="projects.length > 12 ? '70vh' : '100%'"
      fixed-header
    >
      <template v-slot:[`item.status`]="{ item }">
        {{
          projectsStatus.find(
            (status) => status.value === parseInt(item.columns.status)
          ).title || item.status
        }}
      </template>
      <template v-slot:[`item.action`]="{ item }">
        <v-tooltip text="View Project" location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              icon="mdi-eye"
              variant="tonal"
              size="x-small"
              color="info"
            ></v-btn>
          </template>
        </v-tooltip>
        <v-tooltip text="Edit Project" location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              icon="mdi-pencil"
              variant="tonal"
              size="x-small"
              class="mx-2"
              color="warning"
              @click="editItem(item.columns.sn)"
            ></v-btn>
          </template>
        </v-tooltip>
        <v-tooltip text="Delete Project" location="bottom">
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
