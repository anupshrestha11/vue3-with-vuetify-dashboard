<script setup>
import { computed } from 'vue';
import {useBookingStore} from '../store';
import { headers } from '../util';
import { handleError } from '@/utils/error';
import router from '@/router';
import { onMounted } from 'vue';

const props = defineProps({
  propertyId: {
    type: Number,
    required: false,
    default: null,
  }
});


const store = useBookingStore();
store.fetchBookings().catch(handleError);
const bookings = computed(() => store.bookings);

const filter = {}

if(props.propertyId){
  filter.property_id = props.propertyId
}


function loadItems(){
  store.fetchBookings(filter).catch(handleError);
}

function viewBooking(sn){
    let booking = bookings.value.find( (item) => {
        return item.sn === sn;
    });

    router.push(`/booking-details/${booking.id}`);
}

onMounted(loadItems);

</script>

<template>
    <v-card class="mt-4">
        <v-data-table-virtual
            :headers="headers"
            :items="bookings"
            :itemsperpage=10
            :height="bookings.length > 10? '70vh':'100%'"
            fixed-header
        >

        <template v-slot:[`item.action`]="{ item }">
        <v-tooltip text="View Details" location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              icon="mdi-eye"
              variant="tonal"
              size="x-small"
              color="info"
              @click.stop="viewBooking(item.columns.sn)"
            ></v-btn>
          </template>
        </v-tooltip>
        </template>
    </v-data-table-virtual>
</v-card>
</template>