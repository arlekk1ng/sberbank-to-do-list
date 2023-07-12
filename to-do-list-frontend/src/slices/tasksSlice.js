import {createSlice} from '@reduxjs/toolkit'

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        data: [],
    },
    reducers: {
        setTasksData: (state, action) => {
            state.data = action.payload;
        },
        
    },
})

// Action creators are generated for each case reducer function
export const {setTasksData} = tasksSlice.actions

export default tasksSlice.reducer
