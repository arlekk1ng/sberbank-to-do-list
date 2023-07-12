import {Checkbox, Space, Table} from 'antd';

const columns = [
    // {
    //     title: 'Состояние',
    //     dataIndex: 'state',
    //     align: "center",
    //     width: 1,
    // },
    // Table.EXPAND_COLUMN,
    {
        title: 'Название',
        dataIndex: 'name',
    },
    Table.EXPAND_COLUMN,
    {
        title: 'Действия',
        dataIndex: 'action',
        render: (_, record) => (
            <Space size="middle">
                {/*<a>Invite {record.name}</a>*/}
                <a>Изменить</a>
                <a>Удалить</a>
            </Space>
        ),
    },
];

const data = [
    {
        key: '1',
        state: <Checkbox />,
        name: 'Выполнить backend-часть приложения',
        description: "Spring Boot, Hibernate, JPA",
    },
    {
        key: '2',
        state: <Checkbox />,
        name: 'Выполнить frontend-часть приложения',
        description: "JavaScript, Core, Ant D",
    },
    {
        key: '3',
        state: "ARCHIVED",
        name: 'В архиве',
    },
];

const rowSelection = {
    getCheckboxProps: (record) => ({
        disabled: record.state === "ARCHIVED",
        // Column configuration not to be checked
        name: record.name,
    }),
    
    hideSelectAll: true,
    onSelect: (record, selected, selectedRows, nativeEvent) => {
        // console.log(record, selected, selectedRows, nativeEvent);
    },
};

const TaskTableTemplate = () => {
    
    
    return (
        <div>
            <Table
                columns={columns}
                dataSource={data}
                
                pagination={false}
                // bordered={true}
                // showHeader={false}
                // size={"small"}
                title={() => "Какая-то категория"}
                
                rowSelection={rowSelection}
                expandable={{
                    expandedRowRender: (record) => (
                        <p
                            style={{
                                margin: 0,
                            }}
                        >
                            {record.description}
                        </p>
                    ),
                }}
            />
        </div>
    );
};
export default TaskTableTemplate;