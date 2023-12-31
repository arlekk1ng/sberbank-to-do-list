import {createSlice} from '@reduxjs/toolkit'
import React from "react";

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        value: [],
    },
    reducers: {
        setCategories: (state, action) => {
            state.value = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const {setCategories} = categoriesSlice.actions

export default categoriesSlice.reducer
