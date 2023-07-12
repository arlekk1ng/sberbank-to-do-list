import {configureStore} from '@reduxjs/toolkit'
import authReducer from "../slices/authSlice";
import sideMenuReducer from "../slices/sideMenuSlice";
import tasksReducer from "../slices/tasksSlice";

export default configureStore({
    reducer: {
        auth: authReducer,
        sideMenu: sideMenuReducer,
        tasks: tasksReducer,
    },
})
