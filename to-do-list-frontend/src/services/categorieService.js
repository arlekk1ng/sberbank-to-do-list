import axios from "axios";
import {API_DOMAIN} from "./constants";
import authHeader from "./auth-header";
import {setCategories} from "../slices/categoriesSlice";

const API_URL = `${API_DOMAIN}/categories`;

const getCategories = (dispatch) => {
    return axios.get(API_URL,  {headers: authHeader()}).then(
        (response) => {
            dispatch(setCategories(response.data));
        },
        (error) => {
            const _content = (error.response && error.response.data) ||
                error.message ||
                error.toString();
            
            console.error(_content)
            
            dispatch(setCategories([]));
        });
};

const categoriesService = {
    getCategories,
};

export default categoriesService;
