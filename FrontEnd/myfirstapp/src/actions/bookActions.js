import axios from "axios";
import { ADD_BOOKS_ERROR } from "./types";

export const createBook = (book) => async dispatch => {
    try {
        const res = await axios.post("http://localhost:8080/api/books/registerBook", book);
        console.log("Book is added successfully (@bookActions.js)", res);

    } catch (err) {
        console.log("There is an error: (@bookActions.js)", err.response.data);
        dispatch({
            type: ADD_BOOKS_ERROR,
            payload: err.response.data
        });
    }
}