import { GET_ERRORS, GET_USER_DELETE_ERRORS, USER_PENDING_ERROR } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
      
    case USER_PENDING_ERROR:
      return {
        ...state,
        pending: "This is account is not yet approved!",
      }
      
    case USER_PENDING_ERROR:
      return {
        ...state,
        pending: action.payload
      }
    
    case GET_USER_DELETE_ERRORS:
      return {
        message: `${action.payload.username} cannot be deleted`
      }
    default:
      return state;
  }
}