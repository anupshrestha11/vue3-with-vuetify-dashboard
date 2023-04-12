<script setup>
import { computed } from "vue";
import PropertyCard from "./components/property_card.vue";
import { useHomePageStore } from "./store";

const homeStore = useHomePageStore();

const availableSlots = computed(() => homeStore.availableSlots);

homeStore.fetchPlots();
</script>
<template>
  <v-container>
    <v-row>
      <v-col class="text-center text-h4">Available Plots</v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="item in Array(availableSlots).keys()"
        :key="item"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        xl="2"
      >
        <property-card></property-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center text-h4 mt-5">Sold Plots</v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="item in Array(10).keys()"
        :key="item"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        xl="2"
      >
        <property-card></property-card>
      </v-col>
    </v-row>
  </v-container>
</template>
