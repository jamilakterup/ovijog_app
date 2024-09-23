import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    accessToken: null,
    user: null,
};

export const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userRegistered: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;
        },

        userLoggedIn: (state, action) => {
            state.accessToken = action?.payload?.accessToken;
            state.user = action.payload.user;
        },
        
        userLoggedOut: (state) => {
            state.accessToken = null;
            state.user = null;
        },
    },
});

export default authSlice.reducer;
export const { userRegistered, userLoggedIn, userLoggedOut } = authSlice.actions;
