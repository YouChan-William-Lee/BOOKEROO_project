import { GET_ERRORS, USER_PENDING_ERROR } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;

    case USER_PENDING_ERROR:
      return {
        ...state,
        pending: action.payload
      }


    default:
      return state;
  }
}