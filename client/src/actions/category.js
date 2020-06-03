import axios from 'axios';
import { url } from '../config';
import { 
    GET_CATEGORIES, 
    HOVER_CATEGORY, 
    UNHOVER_CATEGORY,
    SELECT_CATEGORY 
} from './types';
  

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


// Hover over category
export const hoverCategory = id => async dispatch => { 
      dispatch({
        type: HOVER_CATEGORY,
        payload: id
    })  
}


// Unhover over category
export const unhoverCategory = () => async dispatch => { 
      dispatch({
        type: UNHOVER_CATEGORY
    })  
}


// Select category
export const selectCategory = category => async dispatch => {
    dispatch({
        type: SELECT_CATEGORY,
        payload: category
    })
}

