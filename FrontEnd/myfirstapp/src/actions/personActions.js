import axios from "axios";
import { GET_ERRORS, GET_PERSONS, GET_PERSON } from "./types";

export const createPerson = (person, history) => async dispatch => {
  try {
    const res = await axios.post("http://localhost:8080/api/users/register", person);
    history.push("/dashboard");
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const getUsers = () => async dispatch => {
  const res = await axios.get("http://localhost:8080/api/users/allusers");
  dispatch({
    type: GET_PERSONS,
    payload: res.data
  });
};

export const getUser = (id, history) => async dispatch => {
  try {
    const res = await axios.get(`http://localhost:8080/api/users/${id}`);
    dispatch({
      type: GET_PERSON,
      payload: res.data
    });
  } catch (error) {
    history.push("/dashboard");
  }
};