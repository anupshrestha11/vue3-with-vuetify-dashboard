<script setup>
import { useBookingStore } from "../store";
import { handleError } from "@/utils/error";
import { onMounted, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const bookingId = route.params.id;

const store = useBookingStore();
const booking = computed(() => store.booking);
store.fetchBooking(bookingId).catch(handleError);
</script>

<template>
  <v-container>
    <v-card elevation="4">
      <v-card-text>
        <v-card-title class="text-center text-h6 text-md-h5 text-lg-h4 mb-4"
          >Booking Details</v-card-title
        >
        <v-row>
          <v-col cols="12" sm="12" md="6" lg="4" xl="4">
            <v-carousel
              class="h-100"
              progress="primary"
              cycle
              :continuous="true"
              v-if="booking.property_details"
            >
              <v-carousel-item
                v-for="(image, index) in booking.property_details.images"
                :key="index"
                :src="image.image_url"
                cover
              >
              </v-carousel-item>
            </v-carousel>
          </v-col>

          <v-col cols="12" sm="12" md="6" lg="8">
            <v-card v-if="booking">
              <v-card-item>
                <v-card-title class="mb-3">Booking details</v-card-title>

                <v-row v-if="booking.property_details" class="mb-2 pl-4">
                  <v-col cols="12" sm="6">
                    <p>
                      <span class="font-weight-medium">Project Name: </span>
                      {{ booking.property_details.project }}
                    </p>
                  </v-col>

                  <v-col cols="12" sm="6">
                    <p>
                      <span class="font-weight-medium">Property Name: </span>
                      {{ booking.property_details.title }}
                    </p>
                  </v-col>

                  <v-col cols="12" sm="6">
                    <p>
                      <span class="font-weight-medium"
                        >Kitta no/building no:
                      </span>
                      {{ booking.property_details.lot_no }}
                    </p>
                  </v-col>

                  <v-col cols="12" sm="6">
                    <p>
                      <span class="font-weight-medium">Booked Date: </span>
                      {{ booking.booked_date }}
                    </p>
                  </v-col>

                  <v-col cols="12" sm="6">
                    <p>
                      <span class="font-weight-medium">Valid Till: </span>
                      {{ booking.valid_till }}
                    </p>
                  </v-col>

                  <v-col cols="12" sm="6">
                    <p>
                      <span class="font-weight-medium">Payment Type: </span>
                      {{ booking.payment_type }}
                    </p>
                  </v-col>
                </v-row>

                <v-divider></v-divider>

                <v-card-title class="my-3">User Details</v-card-title>

                <v-row class="pl-4">
                  <v-col cols="12" sm="6">
                    <p>
                      <span class="font-weight-medium">Booked By: </span>
                      {{ booking.booked_by_user }}
                    </p>
                  </v-col>

                  <v-col cols="12" sm="6">
                    <p>
                      <span class="font-weight-medium">Booked For: </span>
                      {{ booking.customer_name }}
                    </p>
                  </v-col>

                  <v-col cols="12" sm="6">
                    <p>
                      <span class="font-weight-medium">Customer Email: </span>
                      {{ booking.customer_email }}
                    </p>
                  </v-col>

                  <v-col cols="12" sm="6">
                    <p>
                      <span class="font-weight-medium">Customer Phone: </span>
                      {{ booking.customer_phone }}
                    </p>
                  </v-col>
                </v-row>
              </v-card-item>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
