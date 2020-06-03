import axios from 'axios'; 
import { url } from '../config';
import { 
    GET_RECIPES,
    SELECT_RECIPE,
    CLEAR_SELECTED_RECIPE,
    SELECT_LATEST,
    GET_ALL_RECIPES
} from './types';


// Get all recipes
export const getAllRecipes = () => async dispatch => {
    try {
        const res = await axios.get(`${url}/api/recipes`);

        dispatch({
            type: GET_ALL_RECIPES,
            payload: res.data.data
        })
    } catch (err) {
        console.error(err.message);
    }
}



// Get all recipes by category
export const getRecipesByCategory = category => async dispatch => {
    try {
        const res = await axios.get(`${url}/api/recipes?category=${category}`);
 
        dispatch({
            type: GET_RECIPES,
            payload: res.data.data 
        })
    } catch (err) {
         console.error(err.message);
    } 
}


// Select a recipe by slug
export const selectRecipe = slug => async dispatch => {
    try {
        const res = await axios.get(`${url}/api/recipes?slug=${slug}`);
 
        dispatch({
            type: SELECT_RECIPE,
            payload: res.data.data[0] 
        })
        
    } catch (err) {
         console.error(err.message);
    } 
}


// Get the latest recipe
export const getLatest = () => async dispatch => {
    try {
        const res = await axios.get(`${url}/api/recipes?latest_recipe=true`);

        dispatch({
            type: SELECT_LATEST,
            payload: res.data.data[0]
        })
    } catch (err) {
        
    }
}


// Clear selected recipe
export const clearSelectedRecipe = () => async dispatch => {
    dispatch({
        type: CLEAR_SELECTED_RECIPE
    })
}