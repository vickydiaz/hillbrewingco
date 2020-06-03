import { 
    SET_ALERT,
    REMOVE_ALERT
} from '../actions/types';

const initialState = {
    alertMessage: null,
    alertType: null
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
       
        case SET_ALERT:
            return {
                ...state,
                alertMessage: payload.msg,
                alertType: payload.type
            }

        case REMOVE_ALERT:
            return {
                ...state,
                alertMessage: null,
                alertType: null
            }
        
        default: 
            return {
                ...state
            }

    }
}