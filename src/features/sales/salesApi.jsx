import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const salesApi = createApi({
    reducerPath: "salesApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://5.189.180.8:8010" }),
    endpoints: (builder) => ({
        submitSalesEntry: builder.mutation({
            query:(data) => ({
                url: '/header/multiple',
                method: 'POST',
                body:data
            })
        }),
        createDetails: builder.mutation({
            query:(data) => ({
                url: '/detail',
                method: 'POST',
                body:data
            })
        }),
        getItemMaster: builder.query({
            query: () => "/item"
        })
    })
})


export const { useSubmitSalesEntryMutation, useGetItemMasterQuery } = salesApi