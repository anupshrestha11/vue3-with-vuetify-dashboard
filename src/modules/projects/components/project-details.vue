<script setup>
import PropertiesTable from '@/modules/properties/components/properties-table.vue';
import { useProjectsStore } from '../store';
import { handleError } from '@/utils/error';
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const projectId = route.params.id
const store = useProjectsStore();
const project = computed(() => store.project);
store.fetchSingleProject(projectId).catch(handleError);

</script>

<template>
    <v-container>
        <v-card>
            <v-card-item>
                <v-card-title class="text-center text-h6 text-md-h5 text-lg-h4">{{ project.title }}</v-card-title>
                <v-row>
                    <v-col cols="12" sm="12" md="6" lg="4" xl="4">
                        <v-carousel  progress="primary" cycle :continuous="true" v-if="project.images">
                            <v-carousel-item v-for="(image, index) in project.images"  :key="index" :src="image.image_url" cover>
                            </v-carousel-item>
                        </v-carousel>
                    </v-col>

                    <v-col cols="12" sm="12" md="6" lg="8">
                        <div class="text-left">
                            <p class="subtitle-1 font-weight-medium">Description:</p>
                            <p class="subtitle-2 font-weight-regular">{{ project.description }}</p>
                        </div>
                        <v-row class="mt-2">
                            <v-col cols="12">
                                <div class="text-h5"> <v-icon icon="mdi-map-marker-radius-outline" size="large"
                                        color="blue-darken-1"></v-icon> Location details</div>
                            </v-col>
                            <v-col cols="12" sm="6" md="4" lg="4" xl="4">
                                <v-card>
                                    <v-card-item>
                                        <v-card-text><v-icon size="medium" color="blue-darken-1"
                                                icon="mdi-map-marker"></v-icon> Province</v-card-text>
                                        <v-card-title>{{ project.province }}</v-card-title>
                                    </v-card-item>
                                </v-card>
                            </v-col>

                            <v-col cols="12" sm="6" md="4" lg="4" xl="4">
                                <v-card>
                                    <v-card-item>
                                        <v-card-text><v-icon size="medium" color="blue-darken-1"
                                                icon="mdi-map-marker"></v-icon> District</v-card-text>
                                        <v-card-title>{{ project.district }}</v-card-title>
                                    </v-card-item>
                                </v-card>
                            </v-col>

                            <v-col cols="12" sm="6" md="4" lg="4" xl="4">
                                <v-card>
                                    <v-card-item>
                                        <v-card-text><v-icon size="medium" color="blue-darken-1"
                                                icon="mdi-map-marker"></v-icon>Local Body</v-card-text>
                                        <v-card-title>{{ project.municipality }}</v-card-title>
                                    </v-card-item>
                                </v-card>
                            </v-col>


                            <v-col cols="12" sm="6" md="4" lg="4" xl="4">
                                <v-card>
                                    <v-card-item>
                                        <v-card-text><v-icon size="medium" color="blue-darken-1"
                                                icon="mdi-map-marker"></v-icon> Ward</v-card-text>
                                        <v-card-title>{{ project.ward }}</v-card-title>
                                    </v-card-item>
                                </v-card>
                            </v-col>

                            <v-col cols="12" sm="6" md="4" lg="4" xl="4">
                                <v-card>
                                    <v-card-item>
                                        <v-card-text><v-icon size="medium" color="blue-darken-1"
                                                icon="mdi-map-marker"></v-icon>Tole</v-card-text>
                                        <v-card-title>{{ project.tole }}</v-card-title>
                                    </v-card-item>
                                </v-card>
                            </v-col>

                        </v-row>
                    </v-col>
                </v-row>

                <v-row>
                    <!-- properties details -->
                    <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                        <v-row class="mt-2">
                            <v-col cols="12">
                                <div class="text-h5"><v-icon icon="mdi-land-plots" size="large"
                                        color="blue-darken-1"></v-icon> properties details</div>
                            </v-col>
                            <v-col cols="12" sm="6" md="3" lg="3" xl="3">
                                <v-alert type="info" title="Property"
                                    >{{ project.total_properties }}</v-alert>
                        
                            </v-col>

                            <v-col cols="12" sm="6" md="3" lg="3" xl="3">
                                <v-alert type="success" title="Open"
                                    >{{ project.total_properties }}</v-alert>
                            </v-col>

                            <v-col cols="12" sm="6" md="3" lg="3" xl="3">
                                <v-alert type="warning" title="Booked"
                                    >{{ project.total_properties }}</v-alert>
                            </v-col>


                            <v-col cols="12" sm="6" md="3" lg="3" xl="3">
                                <v-alert type="error" title="Sold"
                                    >{{ project.total_properties }}</v-alert>
                            </v-col>

                        </v-row>
                    </v-col>
                </v-row>
            </v-card-item>
        </v-card>
        <properties-table :projectId="parseInt(projectId)" ></properties-table>

    </v-container>
</template>