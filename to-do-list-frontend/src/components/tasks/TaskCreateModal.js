import { Button, Form, Input, Modal, Radio } from 'antd';
import { useState } from 'react';
import TextArea from "antd/es/input/TextArea";
import taskService from "../../services/taskService";
import {useDispatch} from "react-redux";
const CollectionCreateForm = ({ open, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    
    return (
        <Modal
            open={open}
            title="Создать новую задачу"
            okText="Создать"
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
                            message: 'Пожалуйста введите название задачи!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                
                <Form.Item name="description" label="Описание">
                    <TextArea
                        showCount
                        maxLength={255}
                        autoSize
                    />
                </Form.Item>
                
            </Form>
        </Modal>
    );
};
const TaskCreateModal = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    
    const onCreate = (values) => {
        // console.log('Received values of form: ', values);
        taskService.addTask(values, dispatch);
        setOpen(false);
    };
    
    return (
        <div>
            <Button
                type="primary"
                onClick={() => {
                    setOpen(true);
                }}
            >
                Добавить задачу
            </Button>
            <CollectionCreateForm
                open={open}
                onCreate={onCreate}
                onCancel={() => {
                    setOpen(false);
                }}
            />
        </div>
    );
};
export default TaskCreateModal;