import { createSlice } from "@reduxjs/toolkit";

export const generalSlice = createSlice({
    name: 'general',
    initialState: {
        loading: false,
        modalFolder: false,
        modalError: {
            open: false,
            title: '',
            message: ''
        },
        modalMessage: {
            open: false,
            title: '',
            message: ''
        },
    },
    reducers: {
        setIsLoading: (state, action) => {state.loading = action.payload},
        setOpenModalFolder: (state, action) => {state.modalFolder = action.payload},
        setModalError: (state, action) => {state.modalError = {
            open: action.payload.open,
            title: action.payload.title,
            message: action.payload.message
        }},
        setModalMessage: (state, action) => {state.modalMessage = {
            open: action.payload.open,
            title: action.payload.title,
            message: action.payload.message
        }},
    }
})

export const {setIsLoading, setOpenModalFolder, setModalError, setModalMessage} = generalSlice.actions
export default generalSlice.reducer