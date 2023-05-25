<script setup>
import { computed } from 'vue';
import {useBookingStore} from '../store';
import { headers } from '../util';
import { handleError } from '@/utils/error';

const store = useBookingStore();
store.fetchBookings().catch(handleError);
const bookings = computed(() => store.bookings);


</script>

<template>
    <v-card class="mt-4">
        <v-data-table-virtual
            :headers="headers"
            :items="bookings"
            :itemsperpage=10
            :height="bookings.length > 10? '70vh':'100%'"
        >
    </v-data-table-virtual>
</v-card>
</template>