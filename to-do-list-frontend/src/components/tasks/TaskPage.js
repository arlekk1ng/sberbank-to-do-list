import React, {useEffect} from 'react';
import TaskTable from "./TaskTable";
import TaskCreateModal from "./TaskCreateModal";
import {Divider} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import taskService from "../../services/taskService";

const TaskPage = () => {
    const dispatch = useDispatch();
    const { categoryId } = useParams();
    const auth = useSelector(state => state.auth);

    useEffect(() => {
        if (auth.isLoggedIn) {
            taskService.getCategoryTasks(categoryId, dispatch);
        }
    }, []);
    
    return (
        <div
            style={{
                width: "60%",
                margin: "auto",
        }}
        >
            <TaskCreateModal categoryId={categoryId}/>
            <Divider />
            <TaskTable />
        </div>
    );
};

export default TaskPage;