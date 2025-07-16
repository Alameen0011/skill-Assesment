import { configureStore } from "@reduxjs/toolkit";
import { salesApi } from "../features/sales/salesApi";
import salesReducer from "../features/sales/salesSlice"


export const store = configureStore({
    reducer: {
         sales: salesReducer,
        [salesApi.reducerPath]: salesApi.reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(salesApi.middleware)
})