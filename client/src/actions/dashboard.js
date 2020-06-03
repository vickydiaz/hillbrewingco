import axios from 'axios';
import { url } from '../config';

export const CHANGE_EDIT_MODE = 'CHANGE_EDIT_MODE';
export const ClOSE_ADD_CATEGORY_FORM = 'CLOSE_ADD_CATEGORY_FORM';
export const SAVE_RECIPE = 'SAVE_RECIPE';
export const SELECT_EDIT_RECIPE = 'SELECT_EDIT_RECIPE';
export const ClEAR_EDIT_STATE = 'CLEAR_EDIT_STATE';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_ALL_RECIPES = 'GET_ALL_RECIPES';
export const SELECT_CATEGORY = 'SELECT_CATEGORY';
export const DELETE_RECIPE = 'DELETE_RECIPE';


// Get categories
export const getCategories = () => async dispatch => {
    try {
        const res = await axios.get(`${url}/api/categories`);
 
        dispatch({
            type: GET_CATEGORIES,
            payload: res.data.data 
        })
    } catch (err) {
         console.error(err.message);
    } 
 }

// Select category
export const selectCategory = category => async dispatch => {
    dispatch({
        type: SELECT_CATEGORY,
        payload: category
    })
}


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
 


// Change edit mode
export const changeEditMode = mode => async dispatch => {
    dispatch({
        type: CHANGE_EDIT_MODE,
        payload: mode
    })

    if(mode === null) {
        dispatch({
            type: ClEAR_EDIT_STATE
        })
    }
}



// Save new recipe 
export const saveNewRecipe = (formData, imgData) => async dispatch => {
    try {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post(`${url}/api/recipes`, formData, config);
        
        // upload image

        if(imgData) {
            const fd = new FormData();
            fd.append('file', imgData, imgData.name)
            
            const configImg = {
                headers: {
                    'Content-Type': 'multi-part/formdata'
                }
            }
    
            await axios.put(`${url}/api/recipes/${res.data.data._id}/photo`, fd, configImg)
        }
       

        dispatch({
            type: SAVE_RECIPE,
            payload: res.data.data
        })
        
    } catch (err) {
        console.log(err.message);
    }
} 


// Update recipe
export const updateRecipe = (id, formData) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put(`${url}/api/recipes/${id}`, formData, config);

        dispatch({
            type: SAVE_RECIPE,
            payload: res.data.data
        })
    } catch (err) {
        console.log(err.message)
    }
}


// Select a recipe by id
export const selectEditRecipe = id => async dispatch => {
    try {
        const res = await axios.get(`${url}/api/recipes?_id=${id}`);
 
        dispatch({
            type: SELECT_EDIT_RECIPE,
            payload: res.data.data[0] 
        })
        
    } catch (err) {
         console.error(err.message);
    } 
}


// Delete recipe
export const deleteRecipe = id => async dispatch => {
    try {
        const res = await axios.delete(`${url}/api/recipes/${id}`);

    console.log(res.data._id);

    dispatch({
        type: DELETE_RECIPE,
        payload: res.data._id
    })

    } catch (err) {
        console.log(err.message);
        
    }
}


// Save new category
export const saveCategory = (formData) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post(`${url}/api/categories`, formData, config);


        dispatch({
            type: ClOSE_ADD_CATEGORY_FORM,
            payload: res.data
        })

    } catch (err) {
        
    }
}


