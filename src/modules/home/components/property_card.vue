<script setup>
defineProps({
  id:Number,
  title: String,
  image_url: String,
  district: String,
});
</script>
<template>
  <v-card>
    <v-img
      :src="image_url"
      height="150"
      cover
    ></v-img>
    <v-card-title> {{ title  }} </v-card-title>
    <v-card-subtitle> {{ district }}</v-card-subtitle>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn :to="({ name: 'project-details', params: { id } })" color="primary" variant="text">Explore</v-btn>
    </v-card-actions>
  </v-card>
</template>
