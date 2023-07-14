import {Form, Input, Modal} from 'antd';
import {useState} from 'react';
import TextArea from "antd/es/input/TextArea";
import {useDispatch, useSelector} from "react-redux";
import {EditOutlined} from "@ant-design/icons";

const TaskEditForm = ({ open, onCreate, onCancel, record }) => {
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
                    initialValue={record.name}
                >
                    <Input allowClear />
                </Form.Item>
                
                <Form.Item
                    name="description"
                    label="Описание"
                    initialValue={record.description}
                >
                    <TextArea
                        showCount
                        maxLength={255}
                        autoSize
                        allowClear
                    />
                </Form.Item>
                
            </Form>
        </Modal>
    );
};
const TaskEditModal = ({record}) => {
    const dispatch = useDispatch();
    const tasksData = useSelector(state => state.tasks.data);
    
    const [open, setOpen] = useState(false);
    
    const onCreate = (values) => {
        // обновление задачи
        setOpen(false);
    };
    
    return (
        <div>
            <EditOutlined
                onClick={() => {
                    setOpen(true);
                }}
            />
            <TaskEditForm
                open={open}
                onCreate={onCreate}
                onCancel={() => {
                    setOpen(false);
                }}
                record={record}
            />
        </div>
    );
};
export default TaskEditModal;