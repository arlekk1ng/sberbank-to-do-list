import React, {useEffect} from 'react';
import TaskTable from "./TaskTable";
import TaskCreateModal from "./TaskCreateModal";
import {Divider} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import categoryService from "../../services/categoryService";

const TaskPage = () => {
    const dispatch = useDispatch();
    const { categoryId } = useParams();
    const auth = useSelector(state => state.auth);

    useEffect(() => {
        if (auth.isLoggedIn) {
            categoryService.getCategoryTasks(categoryId, dispatch);
        }
    }, []);
    
    return (
        <div
            style={{
                width: "60%",
                margin: "auto",
        }}
        >
            <TaskCreateModal categoryId={categoryId} />
            <Divider />
            <TaskTable categoryId={categoryId} />
        </div>
    );
};

export default TaskPage;