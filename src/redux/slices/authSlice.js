import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userData: null,
        isLoggedIn: false,
        token: null
    },
    reducers: {
        setIsAuthenticated: (state, action) => {state.isLoggedIn = action.payload},
        setUserData: (state, action) => {state.userData = action.payload},
        setAuthToken: (state, action) => {state.token = action.payload},
        setLogOut: (state) => {
            state = {
                userData: null,
                isLoggedIn: false,
                token: null
            }
        }
    }
})

export const {setIsAuthenticated, setUserData, setAuthToken, setLogOut} = authSlice.actions
export default authSlice.reducer