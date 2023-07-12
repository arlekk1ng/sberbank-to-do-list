import React, { useState } from 'react';
import { Table } from 'antd';

const TodoList = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState(['1', '3']); // Массив ключей выбранных строк
    
    const dataSource = [
        {
            key: '1',
            name: 'Task 1',
            description: 'Description 1',
            state: 'In Progress',
            priority: 'High',
        },
        {
            key: '2',
            name: 'Task 2',
            description: 'Description 2',
            state: 'Completed',
            priority: 'Low',
        },
        {
            key: '3',
            name: 'Task 3',
            description: 'Description 3',
            state: 'In Progress',
            priority: 'Medium',
        },
    ];
    
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'State',
            dataIndex: 'state',
            key: 'state',
        },
        {
            title: 'Priority',
            dataIndex: 'priority',
            key: 'priority',
        },
    ];
    
    return (
        <Table
            dataSource={dataSource}
            columns={columns}
            rowSelection={{
                selectedRowKeys,
                onChange: selectedRowKeys => {
                    console.log(selectedRowKeys);
                    setSelectedRowKeys(selectedRowKeys);
                },
            }}
        />
    );
};

export default TodoList;