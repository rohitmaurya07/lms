import { combineReducers } from "@reduxjs/toolkit";
import { authApi } from "@/features/api/authApi";
import authReducer from "../../src/features/authSlice.js";


const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer
    
})

export default rootReducer