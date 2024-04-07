
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, requestConfig } from '../../utils/config';
import { commonApi } from './commonApi';

export const appointmentsApi = commonApi.injectEndpoints({
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        // prepareHeaders: (headers) => {
        //     const token = localStorage.getItem('token');
        //     console.log(token)
        //     if (token) {
        //         headers.set('Authorization', `Bearer ${token}`);
        //     }
        //     return headers;
        // },
        tagTypes: ['Appointments'], // This is a unique string to use as a tag
        ...requestConfig, // Include the requestConfig in the baseQuery
    }),
    endpoints: (builder) => ({
        getAppointments: builder.query({
            query: () => `/appointments`,
            providesTags: ['Appointments'],
        }),
    }),
});

export const {
    useGetAppointmentsQuery,
} = appointmentsApi;