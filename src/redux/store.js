import { configureStore } from "@reduxjs/toolkit";
import generalReducer from "./slices/generalSlice";
import authReducer from "./slices/authSlice";
import foldersReducer from "./slices/foldersSlice";
import usersReducer from "./slices/usersSlice"

export default configureStore({
    reducer: {
        general: generalReducer,
        auth: authReducer,
        folders: foldersReducer,
        users: usersReducer
    }
})