import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    header: {
    vr_no: "",
    vr_date: "",
    ac_name: "",
    ac_amt: "",
    status: "",
    },
    details: [],
}


const salesSlice = createSlice({
    name: "sales",
    initialState,
    reducers: {
        //----Header form actions
        updateHeader: (state,action) => {
            const { field, value } = action.payload;
            state.header[field] = value
        }
    }

})


export const {
    updateHeader,
} = salesSlice.actions

export default salesSlice.reducer