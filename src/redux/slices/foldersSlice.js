import { createSlice } from "@reduxjs/toolkit";

export const foldersSlice = createSlice({
    name: 'folders',
    initialState: {
        visibleFolders: false,
        folders: [],
        selectedFolder: null,
        credentialSelected: null,
        credentialForm: {
            name: '',
            username: '',
            password: '',
            url: '',
        }
    },
    reducers: {
        setFolders: (state, action) => {state.folders = action.payload},
        setSelectedFolder: (state, action) => {state.selectedFolder = action.payload},
        setSelectedCredential: (state, action) => {state.credentialSelected = action.payload},
        setFormCredential: (state, action) => {state.credentialForm = {
            ...state.credentialForm,
            [action.payload.name] : action.payload.value
        }},
        resetFormCredential: state => {
            state.credentialForm = {
                name: '',
                username: '',
                password: '',
                url: '',
            }
        },
        setEditFormCredential: (state, action) => {state.credentialForm = action.payload},
        setVisibleFolders: (state, action) => {state.visibleFolders = action.payload},
    }
})

export const {setFolders, setSelectedFolder, setSelectedCredential, setFormCredential, resetFormCredential, setEditFormCredential, setVisibleFolders} = foldersSlice.actions
export default foldersSlice.reducer