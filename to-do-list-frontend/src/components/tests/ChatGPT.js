import { Menu, Form, Input, Button } from 'antd';
import { useState } from 'react';

const ChatGPT = () => {
    const [formVisible, setFormVisible] = useState(false);
    
    const handleMenuClick = () => {
        setFormVisible(true);
    };
    
    const handleFormClose = () => {
        setFormVisible(false);
    };
    
    const handleFormSubmit = (values) => {
        // Обработка отправки формы
        console.log(values);
        setFormVisible(false);
    };
    
    return (
        <>
            <Menu onClick={handleMenuClick}>
                <Menu.Item key="form">Открыть форму</Menu.Item>
            </Menu>
            {formVisible && (
                <Form onFinish={handleFormSubmit}>
                    <Form.Item name="inputValue" label="Введите значение">
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Отправить
                        </Button>
                        <Button onClick={handleFormClose}>Закрыть</Button>
                    </Form.Item>
                </Form>
            )}
        </>
    );
};

export default ChatGPT;