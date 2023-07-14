import {Button, Form, Input, Modal} from 'antd';
import {useState} from 'react';
import TextArea from "antd/es/input/TextArea";
import {useDispatch} from "react-redux";
import taskService from "../../services/taskService";

const TaskCreateForm = ({ open, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    
    return (
        <Modal
            open={open}
            title="Добавить новую задачу"
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
                            message: 'Пожалуйста введите название задачи!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                
                <Form.Item
                    name="description"
                    label="Описание"
                >
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

const TaskCreateModal = ({categoryId}) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    
    const onCreate = (values) => {
        taskService.addCategoryTask(categoryId, values, dispatch);
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
            <TaskCreateForm
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