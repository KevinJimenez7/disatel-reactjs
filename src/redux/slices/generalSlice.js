import { createSlice } from "@reduxjs/toolkit";

export const generalSlice = createSlice({
    name: 'general',
    initialState: {
        loading: false,
        modalFolder: false,
    },
    reducers: {
        setIsLoading: (state, action) => {state.loading = action.payload},
        setOpenModalFolder: (state, action) => {state.modalFolder = action.payload}
    }
})

export const {setIsLoading, setOpenModalFolder} = generalSlice.actions
export default generalSlice.reducer