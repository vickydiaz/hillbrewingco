import {  
    GET_RECIPES,
    SELECT_RECIPE,
    CLEAR_SELECTED_RECIPE,
    SELECT_LATEST,
    GET_ALL_RECIPES
} from '../actions/types';

const initialState = {
    recipes: [],
    selectedRecipe: {},
    loading: true,
    error: {}
}


export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {

        case GET_ALL_RECIPES:
            return {
                ...state,
                recipes: payload,
                loading: false
            }

        case GET_RECIPES:
            return {
                ...state,
                recipes: payload,
                loading: false
            }

        case SELECT_RECIPE:
            return {
                ...state,
                selectedRecipe: payload,
                loading: false
            }

        case SELECT_LATEST:
            return {
                ...state,
                selectedRecipe: payload,
                loading: false
            }

        case CLEAR_SELECTED_RECIPE:
            return {
                ...state,
                selectedRecipe: {},
                loading: true
            }

        default: 
            return {
                ...state
            }

    }
} 