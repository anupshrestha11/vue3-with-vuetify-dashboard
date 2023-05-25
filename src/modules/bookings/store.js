import { defineStore } from "pinia";
import service from "./service";

const defaultBooking = {
    booked_by: null,
    property_id: null,
    customer_name: null,
    customer_email: null,
    customer_phone: null,
    status: null,
    amount: null,
    payment_types: null,
};

export const useBookingStore = defineStore("bookingsPage", {
    state: () => ({
            bookings: [],
            bookingsPagination: null,
            editBooking: {...defaultBooking}
        }),
    actions: {
        addBooking(data){
            return service.addBooking(data)
        },
        fetchBookings(data = {}){
            return service.fetchBookings(data).then((response) => {
                this.bookings = response.data.data.map((item, idx)=> ({
                    ...item,
                    sn: ++idx
                }));
                this.bookingsPagination = response.data.meta;
            });
        },
        clearForm(){
            this.editBooking = Object.assign({}, defaultBooking);
        },
    },        
});