import axios from "axios";
import authHeader from "./authHeader";
import {setCategories} from "../slices/categoriesSlice";
import {setTasks} from "../slices/tasksSlice";

const API_URL = "/categories";

// --- задачи категории ---

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

const addCategoryTask = (categoryId, task, dispatch, tasks) => {
    return axios.post(`${API_URL}/${categoryId}/tasks`, task, {headers: authHeader()})
        .then(
            (response) => {
                dispatch(setTasks([response.data, ...tasks]));
            },
            (error) => {
                const _content = (error.response && error.response.data) ||
                    error.message ||
                    error.toString();
                
                console.error(_content);
            }
        )
}

// --- категории ---

const getCategories = (dispatch) => {
    return axios.get(API_URL,  {headers: authHeader()}).then(
        (response) => {
            dispatch(setCategories(response.data));
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();
            
            console.error(_content);
            
            dispatch(setCategories([]));
        });
};

const addCategory = (categoryDTO, dispatch) => {
    return axios.post(API_URL, categoryDTO, {headers: authHeader()})
        .then(
            (response) => {
                getCategories(dispatch);
            },
            (error) => {
                const _content = (error.response && error.response.data) ||
                    error.message ||
                    error.toString();
                
                console.error(_content);
            }
        )
}

const categoryService = {
    getCategoryTasks,
    addCategoryTask,
    getCategories,
    addCategory,
};

export default categoryService;
