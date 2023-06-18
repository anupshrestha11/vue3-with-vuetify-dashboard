<script setup>
import { computed } from "vue";
import { useProjectsStore } from "../store";
import { headers } from "../util";
import { handleError } from "@/utils/error";
import { onMounted } from "vue";
import router from "@/router";

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
  let val = confirm(`Are you sure to delete this (${project.title}) project?`);
  if (val) {
    store.deleteProject(project.id).then(loadItems).catch(handleError);
  }
}

function viewProject(sn){
  let project = projects.value.find( (item) => {
    return item.sn ===sn;
  });
  router.push(`/project-details/${project.id}`);
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
      <template v-slot:[`item.action`]="{ item }">
        <v-tooltip text="View Project" location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              icon="mdi-eye"
              variant="tonal"
              size="x-small"
              color="info"
              @click.stop="viewProject(item.columns.sn)"
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
