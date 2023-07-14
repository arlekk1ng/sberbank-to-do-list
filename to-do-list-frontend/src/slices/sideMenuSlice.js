import {createSlice} from '@reduxjs/toolkit'
import React from "react";

const initUser = JSON.parse(localStorage.getItem("user"));

const defaultMenuItems = [
    {
        key: "login",
        label: "Вход",
    },
    {
        key: "registration",
        label: "Регистрация",
    },
]

const userMenuItems = [
    {
        key: "profile",
        label: "!initialState",
    },
    {
        key: "categories",
        label: "Категории",
    },
    {
        key: "logout",
        label: "Выход",
        danger: true,
    }
];

const initialState = initUser
    ? {menu: [...userMenuItems]}
    : {menu: defaultMenuItems};

export const sideMenuSlice = createSlice({
    name: 'sideMenu',
    initialState: initialState,
    reducers: {
        setUserMenu: (state, action) => {
            userMenuItems[0] = {...userMenuItems[0], label: action.payload.username};
            
            const children = action.payload.categories.map(category => ({
                key: category.id,
                label: category.name,
            }));
            children.push({
                key: "addCategory",
                label: "Добавить",
            });
            
            userMenuItems[1] = {...userMenuItems[1], children: children};
            
            state.menu = [...userMenuItems];
        },
        setDefaultMenu: (state) => {
            state.menu = defaultMenuItems;
        }
    },
})

// Action creators are generated for each case reducer function
export const {setUserMenu, setDefaultMenu} = sideMenuSlice.actions

export default sideMenuSlice.reducer
