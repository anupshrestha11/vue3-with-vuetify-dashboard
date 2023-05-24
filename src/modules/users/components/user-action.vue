<script setup>
import { reactive, ref, onMounted, computed } from "vue";
import { useUserStore } from "../store";
import { handleError } from "@/utils/error";

const store = useUserStore();

const user = computed(() => store.form);
const roles = computed(() => store.roles);

onMounted(() => {
  store.fetchRoles().catch(handleError);
});

const state = reactive({
  dialog: false,
  form: false,
});

const userForm = ref(null);

function submit() {
  userForm.value.validate().then(({ valid }) => {
    if (valid) {
      const data = {
        first_name: user.value.firstName,
        middle_name: user.value.middleName,
        last_name: user.value.lastName,
        email: user.value.email,
        password: user.value.password,
        role: user.value.role,
      };
      store
        .addUser(data)
        .then(() => {
          closeDialog();
          store.fetchUsers();
        })
        .catch(handleError);
    }
  });
}

const closeDialog = () => {
  clearForm();
  state.dialog = false;
};

function clearForm() {
  store.clearForm();
}
</script>

<template>
  <v-dialog v-model="state.dialog" width="800" scrollable persistent>
    <template v-slot:activator="{ props }">
      <v-btn color="primary" v-bind="props">Add User</v-btn>
    </template>
    <v-form :valid="state.form" @submit.prevent="submit" ref="userForm">
      <v-card>
        <v-card-title>Add User</v-card-title>
        <v-card-text style="height=60vh; max-width:100%;">
          <v-text-field
            label="First Name"
            v-model="user.firstName"
            hint="Enter first name"
          ></v-text-field>

          <v-text-field
            label="Middle Name"
            v-model="user.middleName"
            hint="Enter middle name"
          ></v-text-field>

          <v-text-field
            label="last Name"
            v-model="user.lastName"
            hint="Enter Last name"
          ></v-text-field>

          <v-text-field
            label="Email"
            type="email"
            v-model="user.email"
            hint="Enter Email"
          ></v-text-field>

          <v-text-field
            label="Password"
            type="password"
            v-model="user.password"
            hint="Enter Last name"
          ></v-text-field>

          <v-select
            label="Assign role"
            v-model="user.role"
            :items="roles"
          ></v-select>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="closeDialog" color="warning" variant="elevated"
              >Close</v-btn
            >
            <v-btn type="submit" color="primary" variant="elevated">Add</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-form>
  </v-dialog>
</template>
