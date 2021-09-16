import axios from "axios";
import { GET_ERRORS, GET_PERSONS, GET_PERSON } from "./types";

export const createPerson = (person, history) => async dispatch => {
  try {
    const res = await axios.post("http://localhost:8080/api/admin/register", person);
    history.push("/dashboard");
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};
export const getUsers = () => async dispatch => {
  try {
    const res = await axios.get("http://localhost:8080/api/admin/all");
    dispatch({
      type: GET_PERSONS,
      payload: res.data
    });
  }
  catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const getUser = (id, history) => async dispatch => {
  try {
    const res = await axios.get(`http://localhost:8080/api/admin/${id}`);
    dispatch({
      type: GET_PERSON,
      payload: res.data
    });
  } catch (error) {
    history.push("/dashboard");
  }
};

export const approvePendingUser = (user, history) => async dispatch => {
  try {
    const res = await axios.post("http://localhost:8080/api/admin/approveuser", user);
    history.push("/");
    history.push("/reviewAccounts");
    dispatch({
      type: GET_ERRORS,
      payload: { message: user.username + " has been successfully approved." }
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
}

export const rejectPendingUser = (user, history) => async dispatch => {
  try {
    const res = await axios.post("http://localhost:8080/api/admin/rejectuser", user);
    history.push("/");
    history.push("/reviewAccounts");
    dispatch({
      type: GET_ERRORS,
      payload: { message: user.username + " has been successfully rejected." }
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
}

export const blockUser = (user, history) => async dispatch => {
  try {
    const res = await axios.post("http://localhost:8080/api/admin/blockuser", user);
    history.push("/");
    history.push("/reviewAccounts");
    dispatch({
      type: GET_ERRORS,
      payload: { message: user.username + " has been successfully blocked." }
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
}
