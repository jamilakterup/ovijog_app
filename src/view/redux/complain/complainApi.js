import { apiSlice } from "../api/apiSlice";

export const complainApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getComplaints: builder.query({
            query: () => "/complaint/view/",
        }),

        getComplaint: builder.query({
            query: (id) => `/complaint/single/view/${id}/`,
        }),
    }),
});

export const { useGetComplaintsQuery, useGetComplaintQuery } = complainApi;
