import {createSlice} from '@reduxjs/toolkit'
import React from "react";

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        value: [],
    },
    reducers: {
        setTasks: (state, action) => {
            state.value = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const {setTasks} = tasksSlice.actions

export default tasksSlice.reducer
