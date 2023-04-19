<template>
  <v-app>
    <v-layout>
      <v-main>
        <v-container>
          <router-view />
          <status-message></status-message>
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup>
import StatusMessage from "@/components/status-message.vue";
</script>
