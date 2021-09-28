import axios from "axios";
import { UPDATE_ERROR_STATUS } from "./types";

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