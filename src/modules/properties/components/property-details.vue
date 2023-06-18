<script setup>
import { usePropertiesStore } from '../store';
import { handleError } from '@/utils/error';
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import bookingTable from '../../bookings/components/booking-table.vue';
import bookProperty from '../../bookings/components/booking-action.vue'

const route = useRoute();
const propertyId = route.params.id;

const store = usePropertiesStore();
const property = computed(() => store.property);
store.fetchProperty(propertyId).catch(handleError);

</script>

<template>
    <v-container>
        <v-card>
            <v-card-item>
                <v-card-title class="text-center">{{ property.title }}</v-card-title>
            </v-card-item>

            <v-card-text>
                <v-carousel progress="primary" cycle :continuous="true" v-if="property.images">
                    <v-carousel-item v-for="(image, index) in property.images" :key="index" :src="image.image_url"
                        cover></v-carousel-item>

                </v-carousel>
                <v-row class="mt-4">


                    <v-col cols="12" sm="6" md="3" lg="3">
                        <v-card>
                            <v-card-item class="text-center">
                                <v-card-title>{{ property.property_type }}</v-card-title>
                                <v-card-text>Type</v-card-text>
                            </v-card-item>
                        </v-card>
                    </v-col>

                    <v-col cols="12" sm="6" md="3" lg="3">
                        <v-card>
                            <v-card-item class="text-center">
                                <v-card-title>{{ property.lot_no }}</v-card-title>
                                <v-card-text>Kitta no./ Building no.</v-card-text>
                            </v-card-item>
                        </v-card>
                    </v-col>

                    <v-col cols="12" sm="6" md="3" lg="3">
                        <v-card>
                            <v-card-item class="text-center">
                                <v-card-title>{{ property.project }}</v-card-title>
                                <v-card-text>Project</v-card-text>
                            </v-card-item>
                        </v-card>
                    </v-col>

                    <v-col cols="12" sm="6" md="3" lg="3">
                        <v-card class="h-100">
                            <v-card-item class="text-center">
                                <v-card-title><v-chip class="ma-2" color="primary">{{ property.status
                                }}</v-chip></v-card-title>
                            </v-card-item>
                        </v-card>
                    </v-col>
                </v-row>
                <v-divider></v-divider>

                <v-card-item>
                    <v-card-title>Desctiption:</v-card-title>
                    <v-card-text>{{ property.description }}</v-card-text>
                </v-card-item>
            </v-card-text>

            <bookProperty v-if="property.status == 'Open'" v-bind="property"></bookProperty>
            
        </v-card>
        <bookingTable :propertyId="parseInt(propertyId)"></bookingTable>
    </v-container>
</template>