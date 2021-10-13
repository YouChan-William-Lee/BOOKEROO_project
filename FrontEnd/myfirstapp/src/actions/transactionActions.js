import axios from "axios";
import { GET_ERRORS, UPDATE_ERROR_STATUS } from "./types";

export const createTransaction = (transaction, bookUpdateRequest, history, selling) => async dispatch => {
    try {
        const res1 = await axios.post("http://localhost:8083/api/transactions/registertransaction", transaction);
        const res2 = await axios.put(`http://localhost:8082/api/books/update/${transaction.username}/${transaction.isbn}`, bookUpdateRequest);
        if (!selling) {
            history.push(`/book/${transaction.username}/${transaction.isbn}`);
        }
        console.log("this is inside transactionActions", res1, res2);
        dispatch({
            type: GET_ERRORS,
            payload: { message: "New book " + res1.data.numOfNewBook + " Old book " + res1.data.numOfOldBook + " have been successfully purchased!! Thanks for placing an order." }
        });
    } catch (err) {
        console.log(err.response)
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
};

export const getAllTransactions = () => async dispatch => {
    try {
        const res = await axios.get("http://localhost:8083/api/transactions/all");
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