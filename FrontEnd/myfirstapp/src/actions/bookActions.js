import axios from "axios";
import { ADD_BOOKS_ERROR, UPDATE_ERROR_STATUS } from "./types";

export const createBook = (book) => async dispatch => {
    try {
        const res = await axios.post("http://localhost:8080/api/books/registerBook", book);
        console.log("Book is added successfully (@bookActions.js)", res);

        dispatch({
            type: UPDATE_ERROR_STATUS,
            payload: "" 
        });

        if (res.status = 201) {
            return true;
        } else {
            return false;
        }
        

    } catch (err) {
        console.log("There is an error: (@bookActions.js)", err.response.data);
        dispatch({
            type: ADD_BOOKS_ERROR,
            payload: err.response.data 
        });
    }
}