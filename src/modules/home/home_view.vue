<script setup>
import { computed } from "vue";
import PropertyCard from "./components/property_card.vue";
import { useHomePageStore } from "./store";
import { handleError } from "@/utils/error";


const homeStore = useHomePageStore();
homeStore.fetchProjects().catch(handleError);
const ourProjects = computed(() => homeStore.projects);

</script>
<template>
  <v-container>
    <v-row>
      <v-col class="text-center text-h4">Our Projects</v-col>
    </v-row>
    <v-row >
      <v-col
        v-for="(project, index) in ourProjects"
        :key="index"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        xl="2"
      >
        <property-card v-bind="project"></property-card>
      </v-col>
    </v-row>
  </v-container>
</template>
