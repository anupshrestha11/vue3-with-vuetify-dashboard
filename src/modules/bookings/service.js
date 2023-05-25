import { http } from '@/http';
import { commonErrorHandler } from '@/utils';

function addBooking(data){
    return http.post("/booking", data);
}

function fetchBookings() {
    return http.get("/booking").catch(commonErrorHandler);
}

export default {
    addBooking,
    fetchBookings,
}

