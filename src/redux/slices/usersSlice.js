import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        open: false,
        users: [],
        formUser: {
            firstName: '',
            lastName: '',
            email: '',
            phone: ''
        },
        passwordForm: {
            newPassword: '',
            confirmPassword: ''
        },
        userSelected: null
    },
    reducers: {
        setOpenUsers: (state, action) => {state.open = action.payload},
        setUsers: (state, action) => {state.users = action.payload},
        setFormUser: (state, action) => {
            state.formUser = {
                ...state.formUser,
                [action.payload.name] : action.payload.value
            }
        },
        setFormPassword: (state, action) => {
            state.passwordForm = {
                ...state.passwordForm,
                [action.payload.name] : action.payload.value
            }
        },
        setUserSelected: (state, action) => {state.userSelected = action.payload},
        resetFormUser: (state) => {
            state.formUser = {
                firstName: '',
                lastName: '',
                email: '',
                phone: ''
            }
        },
        setFormEditUser: (state, action) => {state.formUser = action.payload}
    }
})

export const {setOpenUsers, setUsers, setFormUser, setFormPassword, setUserSelected, resetFormUser, setFormEditUser} = usersSlice.actions
export default usersSlice.reducer