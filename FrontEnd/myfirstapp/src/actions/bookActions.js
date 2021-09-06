import axios from "axios";
import { GET_ERRORS } from "./types";

export const createBook = (book) => async dispatch => {
    try {
        const res = await axios.post("http://localhost:8080/api/books/registerBook", book);
        console.log(res);

    } catch (err) {
        console.log(err.response);
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
}