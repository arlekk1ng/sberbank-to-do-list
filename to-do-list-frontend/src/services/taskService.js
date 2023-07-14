import axios from "axios";
import authHeader from "./authHeader";
import {setTasks} from "../slices/tasksSlice";
import categoryService from "./categoryService";

const API_URL = "/categories";

const setTaskState = (categoryId, taskId, stateDTO) => {
    return axios.patch(`${API_URL}/${categoryId}/tasks/${taskId}`, stateDTO, {headers: authHeader()})
        .then(
            (response) => {
                // ничего не делаю, т.к. при клике в чекбоксе уже стоит необходимое значение
                // console.log("setTaskState = ", stateDTO);
                // console.log("response: ", response.data);
            },
            (error) => {
                const _content = (error.response && error.response.data) ||
                    error.message ||
                    error.toString();
                
                console.error(_content);
            }
        )
}

const deleteTask = (categoryId, taskId, dispatch) => {
    return axios.delete(`${API_URL}/${categoryId}/tasks/${taskId}`,  {headers: authHeader()}).then(
        (response) => {
            categoryService.getCategoryTasks(categoryId, dispatch);
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();
            
            console.error(_content);
        });
};

const updateTask = (categoryId, taskId, task, dispatch, tasks) => {
    return axios.put(`${API_URL}/${categoryId}/tasks/${taskId}`, task, {headers: authHeader()})
        .then(
            (response) => {
                const updTasks = tasks.map(curTask => {
                    if (curTask.id === taskId) {
                        return {
                            ...curTask,
                            ...task,
                        };
                    }
                    return curTask;
                });
                dispatch(setTasks(updTasks));
            },
            (error) => {
                const _content = (error.response && error.response.data) ||
                    error.message ||
                    error.toString();
                
                console.error(_content);
            }
        )
}

const taskService = {
    setTaskState,
    deleteTask,
    updateTask,
};

export default taskService;
