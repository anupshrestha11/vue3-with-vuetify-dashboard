<script setup>
    import { useUserStore } from '../store';
    import { handleError } from '@/utils/error';
    import { onMounted, computed } from 'vue';
    import { useRoute } from 'vue-router';
    import bookingsTable  from '@/modules/bookings/components/booking-table.vue';

    const route = useRoute();
    const userId = route.params.id;

    const store = useUserStore();
    store.fetchUser(userId).catch(handleError);
    const user = computed( ()=> store.user);

</script>

<template>
    <v-container>
        <v-card>
            <v-card-text>
                <v-row>
                    <v-col cols="12" xs="12" sm="6">
                        <v-img  max-height="300"  src="https://randomuser.me/api/portraits/lego/3.jpg"></v-img>
                    </v-col>

                    <v-col cols="12" xs="12" sm="6">
                        <p class="font-weight-bold ">Name: {{ user.full_name }}</p>
                        <p class="font-weight-bold mt-5">Email: {{ user.email }}</p>
                        <p class="font-weight-bold mt-5">Total bookings: {{ user.bookings_count }}</p>
                    </v-col>
                </v-row>

                <bookingsTable></bookingsTable>
            </v-card-text>
        </v-card>
    </v-container>
</template>