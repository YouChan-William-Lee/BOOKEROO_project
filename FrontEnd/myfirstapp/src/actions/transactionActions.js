import axios from "axios";
import {GET_ERRORS, UPDATE_ERROR_STATUS} from "./types";


export const createSell = (sell, history) => async dispatch => {
    try {
        const res = await axios.post("http://localhost:8083/api/transactions/registersell", sell);
        history.push("/home");
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
};

export const getTransactions = () => async dispatch => {
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