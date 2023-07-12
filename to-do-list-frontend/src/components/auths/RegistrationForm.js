import {LockOutlined, MailOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Form, Input} from 'antd';
import authService from "../../services/auth.service";
import {useNavigate} from "react-router-dom";

const RegistrationForm = () => {
    const navigate = useNavigate();
    
    const onFinish = (values) => {
        authService.register(values);
        navigate("/api/auth/signin");
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    
    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста введите ваше имя пользователя!',
                    },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            
            <Form.Item
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста введите ваш Email!',
                    },
                ]}
            >
                <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
            </Form.Item>
            
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста введите ваш пароль!',
                    },
                ]}
            >
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>
            
            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Зарегистрироваться
                </Button>
            </Form.Item>
        </Form>
    );
};
export default RegistrationForm;