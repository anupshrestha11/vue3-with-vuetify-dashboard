import { defineStore } from "pinia";
import service from "./service";

const defaultBooking = {
    booked_by: null,
    property_id: null,
    customer_name: null,
    customer_email: null,
    customer_phone: null,
    status: null,
    valid_till: null,
    payment_types: null,
    remarks: null,
};

export const useBookingStore = defineStore("bookingsPage", {
    state: () => ({
            bookings: [],
            booking: [],
            propertyStatus: [],
            bookingsPagination: null,
            editBooking: {...defaultBooking},
            dialog: false,
            valid: false,
            formTitle: "Book Now",
        }),
    actions: {
        fetchStatus(){
            return service.fetchStatus().then((response) => {
                this.propertyStatus = response.data.map( (item, idx)=> ({
                    title: item.name,
                    value: item.id,
                }));
            });
        },
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
        fetchBooking(id){
            return service.fetchBooking(id).then((response) => {
                this.booking = response.data.data;
            });
        },
        clearForm(){
            this.editBooking = Object.assign({}, defaultBooking);
            this.formTitle = "Book Now";
        },
        openDialog(dialog = true){
            this.dialog = dialog;
        },
        updateBookingPropertyData(property_id, status){
            this.editBooking.property_id = property_id;
            this.editBooking.status = status
            // this.editBooking = {...this.editBooking, property_id, status}
        }
    },        
});