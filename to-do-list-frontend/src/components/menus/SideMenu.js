import React from 'react';
import {Menu} from "antd";
import authService from "../../services/authService";
import {setDefaultMenu} from "../../slices/sideMenuSlice";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

const SideMenu = () => {
    const navigate = useNavigate();
    const menuItems = useSelector(state => state.sideMenu.menu);
    const dispatch = useDispatch();
    
    const clickMenuItemHandler = ({key}) => {
        switch (key) {
            case "login":
                navigate("/api/auth/signin");
                break;
            case "registration":
                navigate("/api/auth/signup");
                break;
            case "logout":
                authService.logout();
                dispatch(setDefaultMenu());
                navigate("/api/auth/signin");
                break;
            case "create-category":
                // создание категории:
                // отправить запрос на добавление категории
                // обновить слайс категорий
                // обновить слайс меню
                break;
            default:
                // клик по категории
                // отправить запрос на получение тасков по этой категории
                // обновить слайс тасков
                // перенаправить на страницу с тасками
        }
    };
    
    return (
        <div>
            <Menu
                theme="dark"
                mode="inline"
                // defaultSelectedKeys={['2']}
                items={menuItems}
                
                onClick={clickMenuItemHandler}
                selectedKeys={[]}
            />
        </div>
    );
};

export default SideMenu;