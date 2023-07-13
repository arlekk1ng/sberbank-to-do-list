import {configureStore} from '@reduxjs/toolkit'
import authReducer from "../slices/authSlice";
import sideMenuReducer from "../slices/sideMenuSlice";
import categoriesReducer from "../slices/categoriesSlice";

export default configureStore({
    reducer: {
        auth: authReducer,
        sideMenu: sideMenuReducer,
        categories: categoriesReducer,
    },
})
