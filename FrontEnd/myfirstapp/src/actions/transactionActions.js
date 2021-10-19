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

export const getLatestTransactionsFirst = (username, isUserAdmin) => async dispatch => {
    console.log("------- LATEST HISTORY -------")
    try {
        const res = await axios.get(`http://localhost:8083/api/transactions/alllatestfirst/${username}/${isUserAdmin}`);
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

export const getOldestTransactionsFirst = (username, isUserAdmin) => async dispatch => {
    console.log("------- OLDEST HISTORY -------")
    try {
        const res = await axios.get(`http://localhost:8083/api/transactions/alloldestfirst/${username}/${isUserAdmin}`);
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

export const getTransactionsFor = (username) => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:8083/api/transactions/allonlyuser/${username}`)
        dispatch({
            type: UPDATE_ERROR_STATUS,
            payload: res.data
        });
        
    } catch (err) {
        dispatch({
            type: UPDATE_ERROR_STATUS,
            payload: err.response.data
        });
    }
}

export const approvePendingTransaction = (transaction, history) => async dispatch => {
    try {
        const res = await axios.put("http://localhost:8080/api/admin/approvetransaction", transaction);
        console.log(transaction)
        console.log(res)
        history.push("/");
        history.push("/transactionhistory");
        console.log("test")
        dispatch({
            type: GET_ERRORS,
            payload: { message: transaction.username + "/" + transaction.isbn + " refund request has been successfully approved." }
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
}

export const rejectPendingTransaction = (transaction, history) => async dispatch => {
    try {
        const res = await axios.put("http://localhost:8080/api/admin/rejecttransaction", transaction);
        history.push("/");
        history.push("/transactionhistory");
        dispatch({
            type: GET_ERRORS,
            payload: { message: transaction.username + "/" + transaction.isbn + " refund request has been successfully rejected." }
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
}

export const requestRefundTransaction = (transaction, history) => async dispatch => {
    try {
        const res = await axios.put("http://localhost:8080/api/admin/refundrequest", transaction);
        history.push("/");
        history.push("/transactionhistory");
        dispatch({
            type: GET_ERRORS,
            payload: { message: transaction.username + "/" + transaction.isbn + " refund request has been successfully made." }
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
}