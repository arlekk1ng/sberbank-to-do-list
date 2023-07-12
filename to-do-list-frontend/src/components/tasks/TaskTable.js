import {Checkbox, Space, Table} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {DeleteOutlined} from "@ant-design/icons";
import taskService from "../../services/taskService";
import TaskUpdateModal from "./TaskUpdateModal";

const expandable = {
    expandedRowRender: (record) => (
        <p
            style={{
                margin: 0,
            }}
        >
            {record.description}
        </p>
    ),
};

const ChatGPT = () => {
    const tasksData = useSelector(state => state.tasks.data);
    const dispatch = useDispatch();
    
    const getDataWithKey = () => {
        return tasksData.map(task => ({
            ...task,
            key: `task-${task.id}`,
            state: (
                <Checkbox
                    checked={task.state === "COMPLETED"}
                    onChange={(event) => {
                        const reqTask = {
                            state: event.target.checked ? "COMPLETED" : "NOT_COMPLETED",
                        };
                        taskService.updateTaskState(task.id, reqTask, dispatch, tasksData);
                    }}
                />
            )
        }));
    };
    
    return (
        <div>
            <Table
                columns={[
                    {
                        title: 'Состояние',
                        dataIndex: 'state',
                        align: "center",
                        width: 1,
                    },
                    Table.EXPAND_COLUMN,
                    {
                        title: 'Название',
                        dataIndex: 'name',
                    },
                    {
                        title: 'Действия',
                        dataIndex: 'action',
                        width: 1,
                        align: "center",
                        render: (_, record) => (
                            <Space size="middle">
                                <TaskUpdateModal record={record} />
                                <DeleteOutlined
                                    onClick={() => {
                                        taskService.deleteTask(record.id, dispatch);
                                    }}
                                />
                            </Space>
                        ),
                    },
                ]}
                dataSource={getDataWithKey()}
                pagination={false}
                expandable={expandable}
            />
        </div>
    );
};

export default ChatGPT;