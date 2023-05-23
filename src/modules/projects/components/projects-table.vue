/* eslint-disable */
<script setup>
import { computed } from "vue";
import { useProjectsStore } from "../store";
import { headers, projectsStatus } from "../util";
import { handleError } from "@/utils/error";

const store = useProjectsStore();
store.fetchProjects().catch(handleError);
const projects = computed(() => store.projects);
</script>

<template>
  <v-data-table-virtual
    :headers="headers"
    :items="projects"
    :itemsperpage="projects.length"
  >
    <template v-slot:[`item.status`]="{ item }">
      {{
        projectsStatus.find((status) => status.value === item.columns.status)
          .title || item.status
      }}
    </template>
    <template v-slot:[`item.action`]="{}">
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
          ></v-btn>
        </template>
      </v-tooltip>
      <v-tooltip text="Edit Project" location="bottom">
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
</template>
