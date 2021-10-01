import axios from "axios";
import {GET_ERRORS, UPDATE_ERROR_STATUS} from "./types";


export const createSell = (sell, history) => async dispatch => {
    try {
        const res = await axios.post("http://localhost:8083/api/transactions/registersell", sell);
        history.push("/");
        history.push(`/sell/${sell.bookISBN}`);
        dispatch({
            type: GET_ERRORS,
            payload: { message: sell.numOfBook + " " + sell.bookState + " book(s) have been successfully added in the list." }
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
};

export const createShare = (share, history) => async dispatch => {
    try {
        const res = await axios.post("http://localhost:8083/api/transactions/registershare", share);
        history.push("/");
        history.push(`/share/${share.bookISBN}`);
        dispatch({
            type: GET_ERRORS,
            payload: { message: share.numOfBook + " " + share.bookState + " book(s) have been successfully added in the list." }
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
};

export const createTransaction = (transaction, history) => async dispatch => {
    try {
        const res = await axios.post("http://localhost:8083/api/transactions/registertransaction", transaction);
        history.push("/")
        history.push(`/transaction/${transaction.bookISBN}`)

        dispatch({
            type: GET_ERRORS,
            payload: { message: transaction.numOfBook + " " + transaction.bookState + " book(s) have been successfully added into history." }
        });

    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
}

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