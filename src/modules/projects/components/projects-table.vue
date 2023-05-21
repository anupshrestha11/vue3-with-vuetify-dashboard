<script setup>
import { computed } from "vue";
import { useProjectsStore } from "../store";

const headers = [
  {
    title: "S/N",
    align: "center",
    key: "sn",
    width: 100,
  },
  {
    title: "Project Name",
    key: "title",
  },
  {
    title: "Status",
    key: "status",
  },
  {
    title: "Actions",
    align: "center",
  },
];

const store = useProjectsStore();
store.fetchProjects();
const projects = computed(() => store.projects);
</script>

<template>
  <v-data-table-virtual
    :headers="headers"
    :items="projects"
    :itemsperpage="projects.length"
  >
  </v-data-table-virtual>
</template>

