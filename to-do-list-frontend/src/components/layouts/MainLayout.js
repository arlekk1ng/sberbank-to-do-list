import {Layout, Menu, theme} from 'antd';
import React from 'react';
import RegistrationForm from "../auths/RegistrationForm";
import {Route, Routes, useNavigate} from "react-router-dom";
import LoginForm from "../auths/LoginForm";
import {useDispatch, useSelector} from "react-redux";
import authService from "../../services/auth.service";
import {setLogoutMenu} from "../../slices/sideMenuSlice";
import TaskPage from "../tasks/TaskPage";

const { Header, Content, Footer, Sider } = Layout;

const MainLayout = () => {
    const navigate = useNavigate();
    
    const menuItems = useSelector(state => state.sideMenu.menu);
    const dispatch = useDispatch();
    
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    
    const clickMenuItemHandler = ({key}) => {
        switch (key) {
            case "login":
                navigate("/api/auth/signin");
                break;
            case "registration":
                navigate("/api/auth/signup");
                break;
            case "tasks":
                navigate("/tasks");
                break;
            case "logout":
                authService.logout();
                dispatch(setLogoutMenu());
                navigate("/api/auth/signin");
                break;
        }
    };
    
    return (
        <Layout
            style={{
                minHeight: "100vh"
            }}
        >
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={(broken) => {
                    // console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
            >
                <div
                    className="demo-logo-vertical"
                    style={{
                        height: "83px",
                        // fontSize: 49,
                    }}
                >
                    {/*TO DO IT*/}
                </div>
                
                <Menu
                    theme="dark"
                    mode="inline"
                    // defaultSelectedKeys={['2']}
                    items={menuItems}
                    
                    onClick={clickMenuItemHandler}
                    selectedKeys={[]}
                />
            </Sider>
            
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                />
                
                <Content
                    style={{
                        margin: '24px 16px 0',
                    }}
                >
                    <div
                        style={{
                            padding: 24,
                            // minHeight: 360,
                            background: colorBgContainer,
                            
                            minHeight: "100%",
                        }}
                    >
                        
                        <Routes>
                            <Route path={"/api/auth/signin"} element={<LoginForm />} />
                            <Route path={"/api/auth/signup"} element={<RegistrationForm />} />
                            <Route path={"/tasks"} element={<TaskPage />} />
                        </Routes>
                        
                    </div>
                </Content>
                
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    TO DO IT ©2023 Created by Arlekk1ng
                </Footer>
            </Layout>
        </Layout>
    );
};
export default MainLayout;