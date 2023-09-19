import { createSlice } from "@reduxjs/toolkit";
export const token = createSlice({
    name: "token",
    initialState:{
        token:false
    },
    reducers:{
        tokenSet: (state,action)=>{
            state.token = action.payload
        },
    }
})

export const {tokenSet} =token.actions

export default token.reducer