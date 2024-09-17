import { createSlice } from "@reduxjs/toolkit";

const initialState={
    access_token: null,
    user: null,
}

export const authSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        userLoggedIn:(state, action)=>{
            state.access_token = action.payload.access_token
            state.user = action.payload.user
        }
    }
})
// private route create koren

export const {userLoggedIn}=authSlice.actions;
export default authSlice.reducer;