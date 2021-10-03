import axios from "axios";
import {GET_ERRORS, UPDATE_ERROR_STATUS} from "./types";

export const createTransaction = (transaction, bookUpdateRequest, history) => async dispatch => {
    try {
        const res1 = await axios.post("http://localhost:8083/api/transactions/registertransaction", transaction);
        const res2 = await axios.put(`http://localhost:8082/api/books/update/${transaction.username}/${transaction.isbn}`, bookUpdateRequest);
        console.log(res1)
        history.push(`/book/${transaction.username}/${transaction.isbn}`);
        dispatch({
            type: GET_ERRORS,
            payload: { message: "New book " + res1.data.numOfNewBook + " Old book " + res1.data.numOfOldBook + " have been successfully purchased." }
        });
    } catch (err) {
        console.log(err.response)
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
};

export const getAllSold = () => async dispatch => {
    try {
        const res = await axios.get("http://localhost:8083/api/transactions/allsold");
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