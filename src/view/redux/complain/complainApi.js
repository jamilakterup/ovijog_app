import { apiSlice } from "../api/apiSlice";

export const complainApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getComplaints: builder.query({
      query: () => "/complaint/view/",
    }),

    getComplaint: builder.query({
      query: (id) => `/complaint/single/view/${id}/`,
    }),

    getUsersByOffice: builder.query({
      query: (officeId) => ({
        url: officeId ? "/users/office/" : "/users/",
        method: officeId ? "POST" : "GET",
        body: officeId ? { office_id: officeId } : undefined,
      }),
    }),

    getStatus: builder.query({
      query: () => "/status/",
    }),

    submitComplaintProgress: builder.mutation({
      query: (data) => ({
        url: "/complaint-progress-submit/",
        method: "POST",
        body: {
          tracking_id: data.tracking_id,
          status_id: data.status_id,
          assigned_person_id: data.assigned_person_id,
          assigned_office_id: data.assigned_office_id,
          comment: data.comment,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const {
  useGetComplaintsQuery,
  useGetComplaintQuery,
  useGetUsersByOfficeQuery,
  useGetStatusQuery,
  useSubmitComplaintProgressMutation,
} = complainApi;
