<script setup>
import { reactive, computed, onMounted, ref } from "vue";
import { useProjectsStore } from "../store";
import { handleError } from "@/utils/error";
import { projectsStatus } from "../util";

const store = useProjectsStore();

const project = computed(() => store.editItem);

onMounted(() => {
  store.fetchProvinces().catch(handleError);
});

const provinces = computed(() => store.provinces);
const districts = computed(() => store.districts);
const municipalities = computed(() => store.municipalities);

const state = reactive({
  dialog: false,
  form: false,
});

function fetchDistrices() {
  store.fetchDistrices(project.value.provinceId).catch(handleError);
}

function fetchMunicipalities() {
  store.fetchMunicipalities(project.value.districtId).catch(handleError);
}

const projectForm = ref(null);

function submit() {
  projectForm.value.validate().then(({ valid }) => {
    if (valid) {
      const data = getData();
      console.log(data);

      store
        .addProject(data)
        .then(() => {
          closeDialog();
          store.fetchProjects();
        })
        .catch(handleError);
    }
  });
}

function getData() {
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
  } = project.value;
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
  clearForm();
  state.dialog = false;
};

function clearForm() {
  store.clearForm();
}
</script>
<template>
  <v-dialog v-model="state.dialog" width="800" persistent>
    <template v-slot:activator="{ props }">
      <v-btn color="primary" v-bind="props"> Add Project </v-btn>
    </template>
    <v-form :valid="state.form" @submit.prevent="submit" ref="projectForm">
      <v-card>
        <v-card-title> Add Project </v-card-title>

        <v-card-text>
          <v-text-field
            label="Title"
            hint="Enter the title of the project"
            v-model="project.title"
          ></v-text-field>

          <v-select
            label="Province"
            v-model="project.provinceId"
            :items="provinces"
            @update:model-value="fetchDistrices"
          ></v-select>
          <v-select
            label="District"
            v-model="project.districtId"
            :items="districts"
            @update:model-value="fetchMunicipalities"
          ></v-select>
          <v-select
            label="Muncipality"
            v-model="project.municipalityId"
            :items="municipalities"
          ></v-select>

          <v-text-field label="Ward" v-model="project.ward"></v-text-field>
          <v-text-field label="Tole" v-model="project.tole"></v-text-field>
          <v-textarea
            label="Description"
            hint="Enter the description of the project"
            v-model="project.description"
          ></v-textarea>

          <v-file-input
            label="Images"
            accept="image/png, image/jpeg"
            prepend-icon=""
            prepend-inner-icon="mdi-camera"
            v-model="project.images"
            multiple
            chips
          ></v-file-input>

          <v-select
            label="Status"
            :items="projectsStatus"
            v-model="project.status"
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
