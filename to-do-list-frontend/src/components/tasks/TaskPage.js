import React, {useEffect} from 'react';
import TaskTable from "./TaskTable";
import TaskCreateModal from "./TaskCreateModal";
import {Divider} from "antd";
import taskService from "../../services/taskService";
import {useDispatch} from "react-redux";

const TaskPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        taskService.getTasks(dispatch);
    }, []);
    
    return (
        <div>
            <TaskCreateModal />
            <Divider />
            <TaskTable />
        </div>
    );
};

export default TaskPage;