/* eslint-disable */
<script setup>
import { computed } from "vue";
import { usePaymentTypeStore } from "../store";
import { headers } from "../util";
import { handleError } from "@/utils/error";

const store = usePaymentTypeStore();
store.fetchPaymentTypes().catch(handleError);
const paymentTypes =  computed(() => store.paymentTypes);
</script>

<template>
  <v-card class="mt-4">
    <v-data-table-virtual
      :headers="headers"
      :items="paymentTypes"
      :itemsperpage="paymentTypes.length"
      :height="paymentTypes.length > 12 ? '70vh' : '100%'"
      fixed-header
    >
      <template v-slot:[`item.action`]="{}">
        <v-tooltip text="Edit Payment type" location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              icon="mdi-pencil"
              variant="tonal"
              size="x-small"
              class="mx-2"
              color="warning"
            ></v-btn>
          </template>
        </v-tooltip>
        <v-tooltip text="Delete Payment type" location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              icon="mdi-trash-can"
              variant="tonal"
              size="x-small"
              color="red"
            ></v-btn>
          </template>
        </v-tooltip>
      </template>
    </v-data-table-virtual>
  </v-card>
</template>
