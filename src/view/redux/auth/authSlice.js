import { createSlice } from "@reduxjs/toolkit";

const initialState={
    value:{
        'name':'jamil',
        'email':'example@test.com',
        loading:false,
        user:null,
        error:null,
    }
}

export const authSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        userLoggedIn:(state)=>{

        }
    }
})

export const {userLoggedIn}=authSlice.actions;
export default authSlice.reducer;