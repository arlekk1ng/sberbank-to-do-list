import { Button, Form, Input, Modal, Radio } from 'antd';
import { useState } from 'react';
import TextArea from "antd/es/input/TextArea";
import taskService from "../../services/taskService";
import {useDispatch, useSelector} from "react-redux";
import {EditOutlined} from "@ant-design/icons";
const CollectionCreateForm = ({ open, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    
    return (
        <Modal
            open={open}
            title="Изменить задачу"
            okText="Изменить"
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
const TaskUpdateModal = ({record}) => {
    const dispatch = useDispatch();
    const tasksData = useSelector(state => state.tasks.data);
    
    const [open, setOpen] = useState(false);
    
    const onCreate = (values) => {
        taskService.updateTask(record.id, values, dispatch, tasksData);
        setOpen(false);
    };
    
    return (
        <div>
            <EditOutlined
                onClick={() => {
                    setOpen(true);
                }}
            />
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
export default TaskUpdateModal;