import {
    CHANGE_EDIT_MODE,
    SAVE_RECIPE,
    SELECT_EDIT_RECIPE,
    ClOSE_ADD_CATEGORY_FORM, 
    ClEAR_EDIT_STATE,
    GET_CATEGORIES,
    GET_ALL_RECIPES,
    SELECT_CATEGORY,
    DELETE_RECIPE
} from '../actions/dashboard';

const initialState = {
    editMode: null,
    editRecipe: null,
    categories: [],
    recipes: [],
    activeCategory: null
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SELECT_CATEGORY: 
            return {
                ...state,
                activeCategory: payload,
                loading: false
            }

        case GET_CATEGORIES: 
            return {
                ...state,
                categories: payload,
                activeCategory: payload.filter((category) => category.title === 'The Latest')[0],
                loading: false
            }

        case GET_ALL_RECIPES:
            return {
                ...state,
                recipes: payload,
                loading: false
            }

        case ClEAR_EDIT_STATE:
            return {
                ...state,
                editRecipe: null
            }

        case CHANGE_EDIT_MODE:
            return {
                ...state,
                editMode: payload
            }

        case SELECT_EDIT_RECIPE:
            return {
                ...state, 
                editMode: 'editRecipe',
                editRecipe: payload
            }

        case SAVE_RECIPE: 
            return {
                ...state,
                editMode: null,
                recipes: [...state.recipes, payload]
            }

        case DELETE_RECIPE:
            return {
                ...state,
                editMode: null,
                recipes: state.recipes.filter(recipe => recipe._id !== payload)
            }
        
        case ClOSE_ADD_CATEGORY_FORM:
            return {
                ...state,
                editMode: null,
            }
    
        default:
            return {
                ...state
            } 
    }
}