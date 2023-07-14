import axios from "axios";
import authHeader from "./authHeader";
import {setTasks} from "../slices/tasksSlice";

const API_URL = "/categories";

const getCategoryTasks = (categoryId, dispatch) => {
    return axios.get(`${API_URL}/${categoryId}/tasks`,  {headers: authHeader()}).then(
        (response) => {
            dispatch(setTasks(response.data));
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();
            
            console.error(_content);
            
            dispatch(setTasks([]));
        });
};

const addCategoryTask = (categoryId, task, dispatch) => {
    return axios.post(`${API_URL}/${categoryId}/tasks`, task, {headers: authHeader()})
        .then(
            (response) => {
                getCategoryTasks(categoryId, dispatch);
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
    getCategoryTasks,
    addCategoryTask,
};

export default taskService;
