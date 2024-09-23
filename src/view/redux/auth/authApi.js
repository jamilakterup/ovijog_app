import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userRegistered } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: "/users/register/",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;

                    localStorage.setItem(
                        "auth",
                        JSON.stringify({
                            accessToken: result.data.accessToken,
                            user: result.data.user,
                        })
                    );

                    dispatch(
                        userRegistered({
                            accessToken: result.data.accessToken,
                            user: result.data.user,
                        })
                    );
                } catch (err) {
                    console.error(err);
                }
            },
        }),

        login: builder.mutation({
            query: (data) => ({
                url: "/users/login/",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    localStorage.setItem(
                        "auth",
                        JSON.stringify({
                            accessToken: result?.data?.token?.access,
                            user: result?.data?.user,
                        })
                    );

                    dispatch(
                        userLoggedIn({
                            accessToken: result?.data?.token?.access,
                            user: result?.data?.user,
                        })
                    );
                } catch (err) {
                    // console.error(err);
                }
            },
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
