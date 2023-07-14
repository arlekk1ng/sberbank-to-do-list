import {Checkbox, Space, Table} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {DeleteOutlined} from "@ant-design/icons";
import TaskEditModal from "./TaskEditModal";

const expandable = {
    expandedRowRender: (record) => (
        <p
            style={{
                margin: 0,
                // wordWrap: "break-word",
            }}
        >
            {record.description}
        </p>
    ),
};

const columns = [
    {
        title: 'Состояние',
        dataIndex: 'state',
        align: "center",
        width: 1,
        render: (_, record) => {
            if (record.state.includes("COMPLETED")) {
                return (
                    <Checkbox
                        defaultChecked={record.state === "COMPLETED"}
                        onChange={(event) => {
                            const taskDTO = {
                                ...record,
                                state: event.target.checked ? "COMPLETED" : "NOT_COMPLETED",
                            };
                            // обновление состояния задачи
                        }}
                    />
                );
            }
            
            return record.state;
        },
    },
    {
        title: 'Название',
        dataIndex: 'name',
    },
    Table.EXPAND_COLUMN,
    {
        title: 'Действия',
        dataIndex: 'action',
        width: 1,
        align: "center",
        render: (_, record) => (
            <Space size="middle">
                <TaskEditModal record={record} />
                <DeleteOutlined
                    onClick={() => {
                        // удаление задачи
                    }}
                />
            </Space>
        ),
    },
];

const TaskTable = () => {
    const tasks = useSelector(state => state.tasks.value);
    const dispatch = useDispatch();
    
    const getTasksWithKey = () => {
        return tasks.map(task => ({
            ...task,
            key: task.id,
        }));
    };
    
    return (
        <div>
            <Table
                columns={columns}
                dataSource={getTasksWithKey()}
                pagination={false}
                expandable={expandable}
            />
        </div>
    );
};

export default TaskTable;