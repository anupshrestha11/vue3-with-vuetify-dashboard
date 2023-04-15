<script setup>
import { reactive } from "vue";
import { useAuthStore } from "./store";
import router from "@/router";

const store = useAuthStore();

const state = reactive({
  email: null,
  password: null,
  valid: true,
});

function onSubmit() {
  console.log(state.email, state.password);
  store.login(state.email, state.password).finally(() => {
    router.push("/");
  });
}
</script>
<template>
  <v-form
    @submit.prevent="onSubmit"
    v-model="valid"
    class="d-flex justify-center align-center h-screen flex-column"
  >
    <h1 class="text-center mb-5">Legends Properties Agency</h1>
    <v-card max-width="500px" width="100%" elevation="20">
      <v-card-title style="text-align: center"> Login Form </v-card-title>
      <v-card-text>
        <v-text-field
          label="Email"
          type="email"
          v-model="state.email"
        ></v-text-field>
        <v-text-field
          label="Password"
          type="password"
          v-model="state.password"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn block variant="flat" color="primary" type="submit">Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>
