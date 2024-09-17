import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://114.130.119.192/api/', 
        // prepareHeaders:(headers)=> {
        //     headers.set('accept', 'application/json');
        //     headers.set('Content-Type', 'application/json');
        //     headers.set('X-CSRFToken', 'hSODMChhwXtNaYvZV74kXQNSPcaIDklV3CTh71pZPSAYqwTXWTOzBuUTSgRpOh02');
        // },
        // // mode:'no-cors'
    }),
    endpoints: (builder) => ({
        // http://10.106.15.243/doc/
    })
})

export const { useSomeEndpointQuery } = apiSlice;