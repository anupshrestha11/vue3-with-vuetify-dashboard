<script setup>
import { reactive, computed, onMounted, ref } from "vue";
import { usePaymentTypeStore } from "../store";
import { handleError } from "@/utils/error";


const store = usePaymentTypeStore();

const paymentType = computed(() => store.editItem);

const state = reactive({
  dialog: false,
  form: false,
});


const paymentTypeForm = ref(null);

function submit() {
  paymentTypeForm.value.validate().then(({ valid }) => {
    if (valid) {
      const data = getData();

      store
        .addPaymentType(data)
        .then(() => {
          closeDialog();
          store.fetchPaymentTypes();
        })
        .catch(handleError);
    }
  });
}

function getData() {
  const {
    title,
    description,
  } = paymentType.value;

  return {
    title,
    description,
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
      <v-btn color="primary" v-bind="props"> Add Payment Type </v-btn>
    </template>
    <v-form :valid="state.form" @submit.prevent="submit" ref="paymentTypeForm">
      <v-card>
        <v-card-title>Add Payment Type</v-card-title>
        <v-card-text style="height: 50vh; max-height: 100%;">
          <v-text-field
            label="Title"
            hint="Enter Payment Title"
            v-model="paymentType.title"
          ></v-text-field>

          <v-textarea
            label= "Description"
            hint = "Enter description"
            v-model="paymentType.description"
          ></v-textarea>

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
