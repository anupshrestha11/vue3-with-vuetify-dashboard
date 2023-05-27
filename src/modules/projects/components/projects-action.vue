<script setup>
import { onMounted, ref } from "vue";
import { useProjectsStore } from "../store";
import { handleError } from "@/utils/error";
import { projectsStatus } from "../util";
import { storeToRefs } from "pinia";

const store = useProjectsStore();
const projectForm = ref(null);
const {
  editItem,
  provinces,
  districts,
  municipalities,
  dialog,
  valid,
  formTitle,
  editIndex,
} = storeToRefs(store);

function fetchDistrices() {
  store.fetchDistrices(editItem.value.provinceId).catch(handleError);
}

function fetchMunicipalities() {
  store.fetchMunicipalities(editItem.value.districtId).catch(handleError);
}

function submit() {
  projectForm.value.validate().then(({ valid }) => {
    if (valid) {
      const data = getFormattedData();

      if (!editIndex.value)
        store
          .addProject(data)
          .then(() => {
            closeDialog();
            store.fetchProjects();
          })
          .catch(handleError);
      else
        store
          .updateProject(editIndex.value, data)
          .then(() => {
            closeDialog();
            store.fetchProjects();
          })
          .catch(handleError);
    }
  });
}

function getFormattedData() {
  const {
    title,
    description,
    provinceId: province_id,
    districtId: district_id,
    municipalityId: municipality_id,
    ward,
    tole,
    images,
    status,
  } = editItem.value;
  return {
    title,
    ward,
    tole,
    images,
    status,
    description,
    province_id,
    district_id,
    municipality_id,
  };
}

const closeDialog = () => {
  store.clearForm();
  store.openDialog(false);
};

onMounted(() => {
  store.fetchProvinces().catch(handleError);
});

const rules = {
  required: (v) => !!v || "Required",
};
</script>
<template>
  <v-dialog v-model="dialog" width="800" persistent>
    <template v-slot:activator="{ props }">
      <v-btn color="primary" v-bind="props"> Add Project </v-btn>
    </template>
    <v-form :valid="valid" @submit.prevent="submit" ref="projectForm">
      <v-card>
        <v-card-title> {{ formTitle }} </v-card-title>

        <v-card-text>
          <v-text-field
            label="Title"
            hint="Enter the title of the project"
            v-model="editItem.title"
            :rules="[rules.required]"
          ></v-text-field>

          <v-select
            label="Province"
            v-model="editItem.provinceId"
            :items="provinces"
            :rules="[rules.required]"
            @update:model-value="fetchDistrices"
          ></v-select>
          <v-select
            label="District"
            v-model="editItem.districtId"
            :items="districts"
            :rules="[rules.required]"
            @update:model-value="fetchMunicipalities"
          ></v-select>
          <v-select
            label="Muncipality"
            v-model="editItem.municipalityId"
            :items="municipalities"
            :rules="[rules.required]"
          ></v-select>

          <v-text-field
            label="Ward"
            v-model="editItem.ward"
            :rules="[rules.required]"
          ></v-text-field>
          <v-text-field
            label="Tole"
            v-model="editItem.tole"
            :rules="[rules.required]"
          ></v-text-field>
          <v-textarea
            label="Description"
            hint="Enter the description of the project"
            v-model="editItem.description"
            :rules="[rules.required]"
          ></v-textarea>

          <v-file-input
            label="Images"
            accept="image/png, image/jpeg"
            prepend-icon=""
            prepend-inner-icon="mdi-camera"
            v-model="editItem.images"
            multiple
            chips
          ></v-file-input>

          <v-select
            label="Status"
            :items="projectsStatus"
            v-model="editItem.status"
            :rules="[rules.required]"
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
