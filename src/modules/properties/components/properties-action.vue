<script setup>
import { reactive, computed, onMounted, ref } from "vue";
import { usePropertiesStore } from "../store";
import { handleError } from "@/utils/error";

const store = usePropertiesStore();

const property = computed(() => store.form);
const statuses = computed(() => store.statuses);
const projects = computed(() => store.projects);

onMounted(() => {
  store.fetchProjects();
  store.fetchStatuses();
});

const state = reactive({
  dialog: false,
  form: false,
});

const types = [
    {
        title:'land',
        value: 1
    },
    {
        title: 'building',
        value: 2
    }
];

const propertyForm = ref(null);

function submit() {
    propertyForm.value.validate().then(({ valid }) => {
    if (valid) {
      const data = {
        title: property.value.title,
        property_type: property.value.propertyType,
        project_id: property.value.projectId,
        description: property.value.description,
        lot_no:property.value.lotNo,
        ward: property.value.ward,
        images: property.value.images,
        status: property.value.status,
      };
      store
        .addProperty(data)
        .then(() => {
          closeDialog();
          store.fetchProjects();
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
      <v-btn color="primary" v-bind="props">Add Property</v-btn>
    </template>

    <v-form :valid="state.form" @submit.prevent="submit" ref="propertyForm">
      <v-card>
        <v-card-title> Add Property </v-card-title>

        <v-card-text style="height: 60vh; max-height: 100%;">
            <v-select
                label="Property Type"
                v-model="property.propertyType"
                :items="types"
            ></v-select>

            <v-select
                label="Select Project"
                v-model="property.projectId"
                :items="projects"
            ></v-select>

          <v-text-field
            label="Title"
            hint="Enter the title of the Property"
            v-model="property.title"
          ></v-text-field>

          <v-textarea
            label="Description"
            hint="Enter the description of the project"
            v-model="property.description"
          ></v-textarea>

          <v-text-field label="Ward" v-model="property.ward"></v-text-field>
          <v-text-field label="lot Number" v-model="property.lotNo"></v-text-field>
        
          <v-file-input
            label="Images"
            accept="image/png, image/jpeg"
            prepend-icon=""
            prepend-inner-icon="mdi-camera"
            v-model="property.images"
            multiple="2"
            chips
          ></v-file-input>

          <v-select
            label="Status"
            :items="statuses"
            v-model="property.status"
          ></v-select>
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
