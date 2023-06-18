<script setup>
import { reactive, computed, onMounted, ref } from "vue";
import { usePropertiesStore } from "../store";
import { handleError } from "@/utils/error";
import { storeToRefs } from "pinia";

const store = usePropertiesStore();
const propertyForm = ref(null);
const {
    editItem,
    projects,
    property_type,
    statuses,
    dialog,
    valid,
    formTitle,
    editIndex,
} = storeToRefs(store);


function submit() {
    propertyForm.value.validate().then(({ valid }) => {
    if (valid) {
      const data = getFormattedData();

      if(!editIndex.value)
        store
          .addProperty(data)
          .then(() => {
            closeDialog();
            store.fetchProperties();
          })
          .catch(handleError);
      else
          store.updateProperty(editIndex.value, data).then(() => {
            closeDialog();
            store.fetchProjects();
          }).catch(handleError)
    }
  });
}

function getFormattedData(){
  const {
    property_type,
    title,
    description,
    project_id,
    ward,
    lot_no,
    status,
    images,
    }= editItem.value;

    return{
      property_type,
      title,
      description,
      project_id,
      ward,
      lot_no,
      status,
      images,
    }
}

onMounted(() => {
  store.fetchProjects();
  store.fetchStatuses();
  store.fetchPropertyTypes();
});

const closeDialog = () => {
  store.clearForm();
  store.openDialog(false);
};

const rules = {
  required: (v)=> !!v || "Required",
};
</script>
<template>
  <v-dialog v-model="dialog" width="800" scrollable persistent>
    <template v-slot:activator="{ props }">
      <v-btn color="primary" v-bind="props">Add Property</v-btn>
    </template>
    <v-form :valid="valid" @submit.prevent="submit" ref="propertyForm">
      <v-card>
        <v-card-title> {{ formTitle }} </v-card-title>
        <v-card-text style="height: 60vh; max-height: 100%;">
            <v-select
                label="Property Type"
                v-model="editItem.property_type"
                :items="property_type"
            ></v-select>

            <v-select
                label="Select Project"
                v-model="editItem.project_id"
                :items="projects"
            ></v-select>

          <v-text-field
            label="Title"
            hint="Enter the title of the Property"
            v-model="editItem.title"
          ></v-text-field>

          <v-textarea
            label="Description"
            hint="Enter the description of the project"
            v-model="editItem.description"
          ></v-textarea>

          <v-text-field label="Ward" v-model="editItem.ward"></v-text-field>
          <v-text-field label="lot Number" v-model="editItem.lot_no"></v-text-field>
        
          <v-file-input
            label="Images"
            accept="image/png, image/jpeg"
            prepend-icon=""
            prepend-inner-icon="mdi-camera"
            v-model="editItem.images"
            multiple="2"
            chips
          ></v-file-input>

          <v-select
            label="Status"
            :items="statuses"
            v-model="editItem.status"
          ></v-select>
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
