<script setup>
import { reactive, computed, onMounted, ref } from "vue";
import { useRolesStore } from "../store";
import { handleError } from "@/utils/error";
import { storeToRefs } from "pinia";


const store = useRolesStore();
const roleForm = ref(null);
const{
  editItem,
  roles,
  permissions,
  dialog,
  formTitle,
  editIndex,
} = storeToRefs(store)

onMounted( () => {
  store.fetchRoles();
  store.fetchPermissions();
});

function submit() {
  roleForm.value.validate().then(({ valid }) => {
    if (valid) {
      const data = getFormattedData();

      if(editIndex.value == -1)
      store
        .addRole(data)
        .then(() => {
          closeDialog();
          store.fetchRoles();
        })
        .catch(handleError);
      else
      store.updateRole(editIndex.value, data).then( () => {
        closeDialog();
        store.fetchRoles();
      }).catch(handleError);
    }
  });
}

function getFormattedData() {
  const {
    name,
    permission,
  } = editItem.value;

  return {
    name,
    permission,
  };
}

const closeDialog = () => {
  store.clearForm();
  store.openDialog(false);
};

const rules = {
  required: (v)=> !!v || "Required"
};
</script>
<template>
  <v-dialog v-model="dialog" width="800" persistent scrollable>
    <template v-slot:activator="{ props }">
      <v-btn color="primary" v-bind="props"> Add Role </v-btn>
    </template>
    <v-form :valid="valid" @submit.prevent="submit" ref="roleForm">
      <v-card>
        <v-card-title> {{ formTitle }} </v-card-title>
        <v-card-text style="height: 50vh; max-height: 100%;">
          <v-text-field
            label="Name"
            hint="Enter Role name"
            v-model="editItem.name"
          ></v-text-field>
          
          <v-select label="Choose Persmissions" :items="permissions" v-model="editItem.permission" multiple chips></v-select>
        </v-card-text>
        
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="closeDialog" color="warning" variant="elevated"
            >Close</v-btn
          >
          <v-btn type="submit" color="primary" variant="elevated">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>
