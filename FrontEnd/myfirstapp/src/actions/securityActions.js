import axios from "axios";
import {GET_ERRORS, GET_PERSON, SET_CURRENT_USER, USER_PENDING_ERROR } from "./types";
import setJWTToken from "../securityUtils/setJWTToken";
import jwt_decode from "jwt-decode";

export const createNewUser = (newUser, history) => async dispatch => {

    try{
        await axios.post("http://localhost:8080/api/users/register", newUser);
        history.push("/login");
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    }
    catch (err){
        dispatch ({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
};

export const login = (LoginRequest) => async dispatch => {

    try {
        // These codes are added by Homy below

        // post => Login Request
        const res = await axios.post("http://localhost:8080/api/users/login", LoginRequest);
        // extract token from res.data
        const { token, pending } = res.data;

        if (!pending) {
            // store the token in the localStorage
            localStorage.setItem("jwtToken", token);
            localStorage.setItem("user", LoginRequest.username);
            // set our token in header ***
            // setJWTToken needs to be coded for token
            //setJWTToken(token);
            // decode token on React
            const decoded = jwt_decode(token);
            // dispatch to our securityReducer
            dispatch({
                type: SET_CURRENT_USER,
                payload: decoded
            });
        } else {

            dispatch({
                type: USER_PENDING_ERROR,
                payload: {}
            })

        }
        
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
}

export const logout = () => dispatch => {
    localStorage.removeItem("jwtToken");
    // setJWTToken needs to be coded for token
    //setJWTToken(false);
    dispatch({
        type: SET_CURRENT_USER,
        payload: {}
    });
};
