<script setup>
import { computed } from "vue";
import { usePropertiesStore } from "../store";

const headers = [
  {
    title: "S/N",
    align: "center",
    key: "sn",
    width: 100,
  },
  {
    title: "Property Title",
    key: "title",
  },
  {
    title: "Project",
    key:"project",
  },
  {
    title: "Property Type",
    key:"property_type",
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

const store = usePropertiesStore();
store.fetchProperties();
const properties = computed(() => store.properties);
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="properties"
    :itemsperpage="properties.length"
  >
  </v-data-table>
</template>

