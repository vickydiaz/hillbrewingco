import axios from 'axios';
import { url } from '../config';

import {
    LOGIN_SUCCESS,
    GET_USER,
    REGISTER_SUCCESS, 
    REGISTER_FAIL,
    LOGOUT
} from './types';


// Load user
export const loadUser = () => async dispatch => {

    try {

        const res = await axios.get(url + '/api/auth/me');

        dispatch({
            type: GET_USER,
            payload: res.data.data
        })

    } catch (err) {
        console.log(err.message);
    }
}

// Login user
export const login = (name, password) => async dispatch => {

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ name, password });

    try {

        const res = await axios.post(`${url}/api/auth/login`, body, config);
        
        
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })


    } catch (err) {
        console.log(err.message);
    }
}


// Register user
export const register = (name, password) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ name, password })
    
    try {
        const res = await axios.post(`${url}/api/auth/register`, body, config);
        console.log(res);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })

        loadUser();

    } catch (err) {
        console.error(err.message);
        dispatch({
            type: REGISTER_FAIL,
        })
    }
}


// Logout user
export const logout = () => async dispatch => {
    dispatch({
        type: LOGOUT
    })
}