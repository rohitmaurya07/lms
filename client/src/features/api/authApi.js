import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { userLoggedin } from "../authSlice";

const USER_API = "http://localhost:3000/api/v1/user/"

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: USER_API,
        credentials: "include"
    }),
    endpoints: (builder)=>({
        registerUser: builder.mutation({
            query: (inputData) => ({
                url: "register",
                method: "POST",
                body: inputData
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                } catch (error) {
                    // handle error
                }
            }
        }),
        loginUser: builder.mutation({
            query: (inputData) => ({
                url: "login",
                method: "POST",
                body: inputData 
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(userLoggedin({user: result.data.user}))
                } catch (error) {
                    console.log(error)
                    // handle error
                }
            }
        })
    })

})


export const {
    useRegisterUserMutation,
    useLoginUserMutation,
} = authApi 