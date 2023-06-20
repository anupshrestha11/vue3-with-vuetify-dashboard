<script setup>
    import { onMounted, computed, ref } from 'vue';
    import { useBookingStore } from '../store';
    import { handleError } from '@/utils/error';
    import { storeToRefs } from 'pinia';

    const  props = defineProps({
      id:Number,
      title: String,
      status: Number,
    });

    
    const store = useBookingStore();
    store.fetchStatus().catch(handleError);
    store.fetchPaymentTypes().catch(handleError);
    const propertyStatus = computed( () => store.propertyStatus);
    const paymentTypes = computed( ()=> store.paymentTypes);

    const bookingForm = ref(null);
    const {
        editBooking,
        dialog,
        valid,
        formTitle,
    } = storeToRefs(store);

    const closeDialog = () => {
        store.clearForm();
        store.openDialog(false);
    };

    onMounted( (id) => {
        store.fetchStatus().catch(handleError);
        store.updateBookingPropertyData(props.id, 'Booked')
    });

    function submit(){
      bookingForm.value.validate().then(({ valid }) => {
        if(valid){
          const data = getFormattedData();

          console.log(data);
          
        }
      });
    }

    function getFormattedData(){
      const {
        property_id,
        status,
        customer_name,
        customer_email,
        customer_phone,
        valid_till,
        paymentType,
        remarks,
      }= editBooking.value;
      return {
        property_id,
        customer_name,
        customer_email,
        customer_phone,
        status,
        valid_till,
        paymentType,
        remarks,
      }
    }
    const rules = {
      required: (v) => !!v || "Required",
    };

    function handleDate(){
      console.log('hello');
    }
</script>

<template>
  <v-dialog v-model="dialog" width="800" persistent scrollable>
    <template v-slot:activator="{ props }">
      <v-spacer></v-spacer>
      <v-btn color="primary" v-bind="props"> {{ formTitle }} </v-btn>
      <v-spacer></v-spacer>
    </template>
    <v-form :valid="valid" @submit.prevent="submit" ref="bookingForm">
      <v-card>
        <v-card-title> Booking - ({{ title }}) </v-card-title>
       
        <v-card-text style="height: 60vh; max-height: 100%;">
          
          <v-text-field
            label="Customer Name"
            v-model="editBooking.customer_name"
            
          ></v-text-field>

          <v-text-field
            label="Customer Email"
            v-model="editBooking.customer_email"
            
          ></v-text-field>

          <v-text-field
            label="Customer Phone"
            v-model="editBooking.customer_phone"
            
          ></v-text-field>         
          
          <v-text-field
            label=" Valid Till"
            slot="activator"
            readonly
            
            >{{ editBooking.valid_till }}
            <v-menu activator="parent">
              <v-date-picker
                  label =" Valid Till"
                  color="blue lighten-1"
                  header-color="primary" 
                  transition="scale-transition"
                  v-model="editBooking.valid_till"
                  @update="handleDate"
              ></v-date-picker>
            </v-menu>
          </v-text-field>
            

          <v-textarea
            label="Remarks"
            hint="Enter the remarks(if any)"
            v-model="editBooking.remarks"            
          ></v-textarea>

          <v-select
            label="Payment Method"
            :items="paymentTypes"
            v-model="editBooking.paymentTypes"
          ></v-select>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="closeDialog" color="warning" variant="elevated"
            >Close</v-btn>
            
          <v-btn type="submit" color="primary" variant="elevated">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>