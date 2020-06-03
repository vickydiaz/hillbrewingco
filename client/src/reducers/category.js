import { 
    GET_CATEGORIES, 
    HOVER_CATEGORY, 
    UNHOVER_CATEGORY, 
    SELECT_CATEGORY
} from '../actions/types';

const initialState = {
    categories: [],
    activeCategory: null,
    hover: null,
    loading: true,
    error: {}
}


export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {

        case GET_CATEGORIES:
            return {
                ...state,
                categories: payload,
                activeCategory: payload.filter((category) => category.title === 'Latest')[0],
                loading: false
            }

        case HOVER_CATEGORY:
            return {
                ...state,
                hover: payload
            }

        case UNHOVER_CATEGORY:
            return {
                ...state,
                hover: null
            }

        case SELECT_CATEGORY: 
            return {
                ...state,
                activeCategory: payload,
                loading: false
            }

        default: 
            return {
                ...state
            }
    }
}