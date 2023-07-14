import {Checkbox, Space, Table} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {DeleteOutlined} from "@ant-design/icons";
import TaskEditModal from "./TaskEditModal";
import taskService from "../../services/taskService";

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



const TaskTable = ({categoryId}) => {
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
                columns={[
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
                                            const stateDTO = {
                                                value: event.target.checked ? "COMPLETED" : "NOT_COMPLETED",
                                            };
                                            taskService.setTaskState(categoryId, record.id, stateDTO);
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
                                <TaskEditModal props={{categoryId, record, tasks}} />
                                <DeleteOutlined
                                    onClick={() => {
                                        taskService.deleteTask(categoryId, record.id, dispatch);
                                    }}
                                />
                            </Space>
                        ),
                    },
                ]}
                dataSource={getTasksWithKey()}
                pagination={false}
                expandable={expandable}
            />
        </div>
    );
};

export default TaskTable;