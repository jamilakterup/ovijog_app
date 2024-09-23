import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://114.130.119.192/api/',
    }),
    endpoints: (builder) => ({

    })
})