import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL} from "../../utils/config.js";

export const commonApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        // if endpoint is cover image or gallery image then remove content type
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            //headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    tagTypes: [ 'Appointments'],
    // eslint-disable-next-line no-unused-vars
    endpoints:_ => ({}),
});