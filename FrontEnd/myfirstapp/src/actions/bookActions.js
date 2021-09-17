import axios from "axios";
import {ADD_BOOKS_ERROR, GET_ERRORS, GET_PERSONS, UPDATE_ERROR_STATUS} from "./types";

export const createBook = (book, history) => async dispatch => {
    try {
        const res = await axios.post("http://localhost:8082/api/books/registerBook", book);
        console.log("Book is added successfully (@bookActions.js)", res);
        history.push("/");
        history.push("/addbook");
        dispatch({
            type: UPDATE_ERROR_STATUS,
            payload: { message: book.bookName + " has been successfully registerd." }
        });

    } catch (err) {
        console.log("There is an error: (@bookActions.js)", err.response.data);
        dispatch({
            type: ADD_BOOKS_ERROR,
            payload: err.response.data 
        });
    }
}

export const getBooks = () => async dispatch => {
    try {
        const res = await axios.get("http://localhost:8082/api/books/allbooks");
        console.log("Books are called successfully (@bookActions.js)", res.data)
        dispatch({
            type: UPDATE_ERROR_STATUS,
            payload: res.data
        });
    }
    catch (err) {
        dispatch({
            type: UPDATE_ERROR_STATUS,
            payload: err.response.data
        });
    }
};

export const getBook = (id, history) => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:8082/api/books/${id}`);
        console.log(res.data)
        dispatch({
            type: UPDATE_ERROR_STATUS,
            payload: res.data
        });
    }
    catch (err) {
        history.push("/book");
    }
};

export const editBook = (book, history) => async dispatch => {
    try {
        const res = await axios.post(`http://localhost:8080/api/admin/editbook/${book.isbn}`, book);
        history.push(`/book/${book.isbn}`);
        console.log(res.data)
        dispatch({
            type: UPDATE_ERROR_STATUS,
            payload: res.data
        });
    }
    catch (err) {
        history.push(`/book/${book.isbn}`);
    }
};
