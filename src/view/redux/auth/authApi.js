import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: "users/login/",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const response = await queryFulfilled;

                    if (response?.data) {

                        // console.log(response.data)
                        const { token, user } = response.data;

                        console.log('--', JSON.stringify({
                            access_token: token.access,
                            user: user
                        }))

                        // Store in localStorage
                        localStorage.setItem('auth', JSON.stringify({
                            access_token: token.access,
                            user: user
                        }));

                        // Dispatch action to update the state
                        dispatch(userLoggedIn({
                            access_token: token.access,
                            user: user,
                        }));
                    }
                } catch (error) {
                    console.error("Login failed: ", error);
                }
            }
        })
    })
});

export const { useLoginMutation } = authApi;
