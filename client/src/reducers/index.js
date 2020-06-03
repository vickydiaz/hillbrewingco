import { combineReducers } from 'redux';
import category from './category';
import recipe from './recipe';
import dashboard from './dashboard';
import auth from './auth';
import alert from './alert';

export default combineReducers({
    category,
    recipe,
    dashboard,
    auth,
    alert
});