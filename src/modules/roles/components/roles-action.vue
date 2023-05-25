<script setup>
import { reactive, computed, onMounted, ref } from "vue";
import { useRolesStore } from "../store";
import { handleError } from "@/utils/error";


const store = useRolesStore();

const role = computed(() => store.editItem);
store.fetchPermissions()
const permissions = computed(() => store.permissions);

const state = reactive({
  dialog: false,
  form: false,
});


const roleForm = ref(null);

function submit() {
  roleForm.value.validate().then(({ valid }) => {
    if (valid) {
      const data = getData();

      store
        .addRole(data)
        .then(() => {
          closeDialog();
          store.fetchRoles();
        })
        .catch(handleError);
    }
  });
}

function getData() {
  const {
    name,
    permissions,
  } = role.value;

  return {
    name,
    permissions,
  };
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
  <v-dialog v-model="state.dialog" width="800" persistent scrollable>
    <template v-slot:activator="{ props }">
      <v-btn color="primary" v-bind="props"> Add Role </v-btn>
    </template>
    <v-form :valid="state.form" @submit.prevent="submit" ref="roleForm">
      <v-card>
        <v-card-title> Add Role </v-card-title>
        {{ permissions }}
        <v-card-text style="height: 70vh; max-height: 100%;">
          <v-text-field
            label="Name"
            hint="Enter Role name"
            v-model="role.name"
          ></v-text-field>

          <v-checkbox 
            label="Checkbox"
            v-model="role.permissions"
          ></v-checkbox>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="closeDialog" color="warning" variant="elevated"
            >Close</v-btn
          >
          <v-btn type="submit" color="primary" variant="elevated">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>
