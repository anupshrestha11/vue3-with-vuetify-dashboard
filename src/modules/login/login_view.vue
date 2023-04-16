<script setup>
import { reactive, ref } from "vue";
import { useAuthStore } from "./store";

const store = useAuthStore();

const state = reactive({
  email: null,
  password: null,
  valid: true,
});

const loginForm = ref(null);

function onSubmit() {
  loginForm.value.validate().then(({ valid }) => {
    if (valid) {
      store.login(state.email, state.password);
    }
  });
}

const emailRules = [(v) => !!v || "Email is required"];
const passwordRules = [(v) => !!v || "Password is required"];
</script>
<template>
  <v-form
    @submit.prevent="onSubmit"
    v-model="state.valid"
    class="d-flex justify-center align-center h-screen flex-column"
    ref="loginForm"
  >
    <h1 class="text-center mb-5">Legends Properties Agency</h1>
    <v-card max-width="500px" width="100%" elevation="20">
      <v-card-title style="text-align: center"> Login Form </v-card-title>
      <v-card-text>
        <v-text-field
          id="email"
          label="Email"
          type="email"
          v-model="state.email"
          :rules="emailRules"
        ></v-text-field>
        <v-text-field
          id="password"
          label="Password"
          type="password"
          v-model="state.password"
          :rules="passwordRules"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn block variant="flat" color="primary" type="submit">Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>
