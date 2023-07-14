import {Layout, theme} from 'antd';
import React from 'react';
import RegistrationForm from "../auths/RegistrationForm";
import {Route, Routes} from "react-router-dom";
import LoginForm from "../auths/LoginForm";
import SideMenu from "../menus/SideMenu";
import TaskPage from "../tasks/TaskPage";

const { Header, Content, Footer, Sider } = Layout;

const MainLayout = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    
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
                
                <SideMenu />
                
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
                            <Route path={"/api/auth/sign-in"} element={<LoginForm />} />
                            <Route path={"/api/auth/sign-up"} element={<RegistrationForm />} />
                            <Route path={"/categories/:categoryId/tasks"} element={<TaskPage />} />
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