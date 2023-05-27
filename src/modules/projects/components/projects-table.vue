<script setup>
import { computed } from "vue";
import { useProjectsStore } from "../store";
import { headers, projectsStatus } from "../util";
import { handleError } from "@/utils/error";
import { onMounted } from "vue";

const store = useProjectsStore();
const projects = computed(() => store.projects);

function loadItems() {
  store.fetchProjects().catch(handleError);
}

function editItem(sn) {
  let editItem = projects.value.find((item) => {
    return item.sn === sn;
  });
  store.updateFormTitle("Edit Project");
  store.updateEditItem(editItem);
  store.updateEditIndex(editItem.id);
  store.openDialog();
}

function deleteItem(sn) {
  let project = projects.value.find((item) => {
    return item.sn === sn;
  });
  let val = confirm(`Are you sure to delete this (${editItem.title}) project?`);
  if (val) {
    store.deleteProject(project.id).then(loadItems).catch(handleError);
  }
}

onMounted(loadItems);
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
              @click.stop="editItem(item.columns.sn)"
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
              @click.stop="deleteItem(item.columns.sn)"
            ></v-btn>
          </template>
        </v-tooltip>
      </template>
    </v-data-table-virtual>
  </v-card>
</template>
