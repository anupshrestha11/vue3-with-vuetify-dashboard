<script setup>
import { computed } from "vue";
import { usePropertiesStore } from "../store";
import { headers } from "../util"
import { handleError } from "@/utils/error";
import { onMounted } from "vue";
import router from "@/router";

const props = defineProps({
  projectId: {
    type: Number,
    required: false,
    default: null
  },

})
console.log(props.projectId)

const store = usePropertiesStore();
const properties = computed(() => store.properties);


const filter = {}

if (props.projectId) {
  filter.project_id = props.projectId
}


function loadItems() {
  store.fetchProperties(filter).catch(handleError);
}


function editItem(sn) {
  let editItem = properties.value.find((item) => {
    return item.sn === sn;
  });
  store.updateFormTitle("Edit Property");
  store.updateEditItem(editItem);
  store.updateEditIndex(editItem.id);
  store.openDialog();
}

function deleteItem(sn) {
  let property = properties.value.find((item) => {
    return item.sn === sn;
  });
  let val = confirm(`Are you sure to delete this (${property.title}) Property?`);
  if (val) {
    store.deleteProperty(property.id).then(loadItems).catch(handleError);
  }
}

onMounted(loadItems);

function viewProperty(sn){
  let property = properties.value.find( (item) => {
    return item.sn === sn;
  });
  router.push(`/property-details/${property.id}`);
}

</script>

<template>
  <v-card class="mt-4">
    <v-data-table-virtual
      :headers="headers"
      :items="properties"
      :itemsperpage="properties.length"
      :height="properties.length > 12 ? '70vh' : '100%'"
      fixed-header
    >
      <template v-slot:[`item.action`]="{ item }">
        <v-tooltip text="View Project" location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              icon="mdi-eye"
              variant="tonal"
              size="x-small"
              color="info"
              @click.stop="viewProperty(item.columns.sn)"
            ></v-btn>
          </template>
        </v-tooltip>
        <v-tooltip text="Edit Project" location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              icon="mdi-pencil"
              variant="tonal"
              size="x-small"
              class="mx-2"
              color="warning"
              @click.stop="editItem(item.columns.sn)"
            ></v-btn>
          </template>
        </v-tooltip>
        <v-tooltip text="Delete Project" location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              icon="mdi-trash-can"
              variant="tonal"
              size="x-small"
              color="red"
              @click.stop="deleteItem(item.columns.sn)"
            ></v-btn>
          </template>
        </v-tooltip>
      </template>
    </v-data-table-virtual>
  </v-card>
</template>

