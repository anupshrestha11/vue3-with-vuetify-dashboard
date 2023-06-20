import { http } from '@/http';
import { commonErrorHandler } from '@/utils';

function fetchStatus(){
    return http.get("/status").catch(commonErrorHandler);
}

function addBooking(data){
    return http.post("/booking", data);
}

function fetchBookings(data) {
    return http.get("/booking",  { params: data }).catch(commonErrorHandler);
}

function fetchBooking(id){
    return http.get(`/booking/${id}`).catch(commonErrorHandler);
}

function fetchPaymentTypes()
{
    return http.get('/payment-types').catch(commonErrorHandler);
}

export default {
    addBooking,
    fetchBookings,
    fetchBooking,
    fetchStatus,
    fetchPaymentTypes,
}

