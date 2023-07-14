import {Button, Checkbox, Input, Space, Table} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {DeleteOutlined, SearchOutlined} from "@ant-design/icons";
import TaskEditModal from "./TaskEditModal";
import taskService from "../../services/taskService";
import {useRef, useState} from "react";
import Highlighter from 'react-highlight-words';

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
    
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={"Поиск названия"}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 85,
                        }}
                    >
                        Поиск
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 85,
                        }}
                    >
                        Сбросить
                    </Button>
                    {/*<Button*/}
                    {/*    type="link"*/}
                    {/*    size="small"*/}
                    {/*    onClick={() => {*/}
                    {/*        confirm({*/}
                    {/*            closeDropdown: false,*/}
                    {/*        });*/}
                    {/*        setSearchText(selectedKeys[0]);*/}
                    {/*        setSearchedColumn(dataIndex);*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    Filter*/}
                    {/*</Button>*/}
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        Закрыть
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    
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
                        filters: [
                            {
                                text: 'Выполненные',
                                value: 'COMPLETED',
                            },
                            {
                                text: 'Не выполненные',
                                value: 'NOT_COMPLETED',
                            },
                        ],
                        onFilter: (value, record) => record.state === value,
                    },
                    {
                        title: 'Название',
                        dataIndex: 'name',
                        ...getColumnSearchProps('name'),
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