import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const salesApi = createApi({
    reducerPath: "salesApi",
    baseQuery: fetchBaseQuery({ baseUrl: "" }),
    endpoints: (builder) => ({
        submitSalesEntry: builder.mutation({
            query:(data) => ({
                url: 'header/multiple',
                method: 'POST',
                body:data
            })
        })
    })
})


export const { useSubmitSalesEntryMutation } = salesApi