import React, {useEffect, useState} from 'react';
import {Form, Input, Menu, Modal} from "antd";
import authService from "../../services/authService";
import {setDefaultMenu, setUserMenu} from "../../slices/sideMenuSlice";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import categoryService from "../../services/categoryService";

const CategoryCreateForm = ({ open, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    
    return (
        <Modal
            open={open}
            title="Добавить новую категорию"
            okText="Добавить"
            cancelText="Отмена"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
            >
                <Form.Item
                    name="name"
                    label="Название"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста введите название категории!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            
            </Form>
        </Modal>
    );
};

const SideMenu = () => {
    const [open, setOpen] = useState(false);
    
    const onCreate = (values) => {
        categoryService.addCategory(values, dispatch);
        setOpen(false);
    };
    
    const navigate = useNavigate();
    const menuItems = useSelector(state => state.sideMenu.menu);
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories.value);
    const auth = useSelector(state => state.auth);
    
    useEffect(() => {
        if (auth.isLoggedIn) {
            categoryService.getCategories(dispatch);
        }
    }, [])
    
    useEffect(() => {
        if (auth.isLoggedIn) {
            const payload = {
                username: auth.user.username,
                categories: categories,
            };
            dispatch(setUserMenu(payload));
        }
    }, [categories]);
    
    const clickMenuItemHandler = ({key}) => {
        switch (key) {
            case "login":
                navigate("/api/auth/sign-in");
                break;
            case "registration":
                navigate("/api/auth/sign-up");
                break;
            case "logout":
                authService.logout();
                dispatch(setDefaultMenu());
                navigate("/api/auth/sign-in");
                break;
            case "addCategory":
                setOpen(true);
                break;
            default:
                // клик по определенной категории
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
            <CategoryCreateForm
                open={open}
                onCreate={onCreate}
                onCancel={() => {
                    setOpen(false);
                }}
            />
        </div>
    );
};

export default SideMenu;