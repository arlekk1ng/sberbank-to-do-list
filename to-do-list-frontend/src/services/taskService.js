import axios from "axios";
import {API_DOMAIN} from "./constants";
import {setTasksData} from "../slices/tasksSlice";
import authHeader from "./auth-header";

const API_URL = `${API_DOMAIN}/tasks`;

const getTasks = (dispatch) => {
    return axios.get(API_URL,  {headers: authHeader()}).then(
        (response) => {
            dispatch(setTasksData(response.data));
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();
            
            console.error(_content)
            
            dispatch(setTasksData([]));
        });
};

const addTask = (task, dispatch) => {
    return axios.post(API_URL, task,  {headers: authHeader()}).then(
        (response) => {
            getTasks(dispatch);
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();
            
            console.error(_content)
        });
};

const deleteTask = (taskId, dispatch) => {
    return axios.delete(`${API_URL}/${taskId}`, {headers: authHeader()}).then(
        (response) => {
            getTasks(dispatch);
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();
            
            console.error(_content)
        });
};

const updateTask = (taskId, reqTask, dispatch, tasksData) => {
    return axios.put(`${API_URL}/${taskId}`, reqTask, {headers: authHeader()}).then(
        (response) => {
            const newTasksData = tasksData.map(task => {
                if (task.id === taskId) {
                    return {
                        ...task,
                        ...reqTask,
                    };
                }
                
                return task;
            });
            
            dispatch(setTasksData(newTasksData));
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();
            
            console.error(_content)
        });
};

const updateTaskState = (taskId, reqTask, dispatch, tasksData) => {
    return axios.patch(`${API_URL}/${taskId}`, reqTask, {headers: authHeader()}).then(
        (response) => {
            const newTasksData = tasksData.map(task => {
                if (task.id === taskId) {
                    return {
                        ...task,
                        ...reqTask,
                    };
                }
                
                return task;
            });
            
            dispatch(setTasksData(newTasksData));
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();
            
            console.error(_content)
        });
};

const taskService = {
    getTasks,
    addTask,
    deleteTask,
    updateTask,
    updateTaskState,
};

export default taskService
