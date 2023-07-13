import axios from "axios";
import {API_DOMAIN} from "./constants";
import authHeader from "./authHeader";
import {setCategories} from "../slices/categoriesSlice";

// const API_URL = `${API_DOMAIN}/categories`;
const API_URL = "/categories";

const getCategories = (dispatch) => {
    return axios.get(API_URL,  {headers: authHeader()}).then(
        (response) => {
            console.log("getCategories, response = ", response.data);
            
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
    getCategories,
    addCategory,
};

export default categoryService;
