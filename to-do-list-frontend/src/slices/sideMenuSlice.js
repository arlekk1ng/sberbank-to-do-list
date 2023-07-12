import {createSlice} from '@reduxjs/toolkit'
import React from "react";

const initUser = JSON.parse(localStorage.getItem("user"));

const menuItems = [
    {
        key: "login",
        // icon: React.createElement(UserOutlined),
        label: "Авторизация",
    },
    {
        key: "registration",
        label: "Регистрация",
    },
    {
        key: "profile",
        label: (initUser ? initUser.username : "DEFAULT"),
    },
    {
        key: "tasks",
        label: "Задачи",
    },
    {
        key: "logout",
        label: "Выход",
        danger: true,
    }
];

const initialState = initUser
    ? {menu: [menuItems[2], menuItems[3], menuItems[4]]}
    : {menu: [menuItems[0], menuItems[1]]};

export const sideMenuSlice = createSlice({
    name: 'sideMenu',
    initialState: initialState,
    reducers: {
        setLoginMenu: (state, action) => {
            menuItems[2] = {...menuItems[2], label: action.payload};
            state.menu = [menuItems[2], menuItems[3], menuItems[4]];
        },
        setLogoutMenu: (state) => {
            state.menu = [menuItems[0], menuItems[1]];
        }
    },
})

// Action creators are generated for each case reducer function
export const {setLoginMenu, setLogoutMenu} = sideMenuSlice.actions

export default sideMenuSlice.reducer
