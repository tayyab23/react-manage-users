import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function loginReducer(state = initialState.session, action) {
  switch (action.type) {
    case types.LOGIN_SESSION_SUCCESS:
      return [...state, ...action.session];
    case types.GET_SESSION_SUCCESS:
      return state;
    case types.DELETE_SESSION_SUCCESS:
      return [...state, null];
    case types.LOGIN_FAIL:
      return [...state, null];
    default:
      return state;
  }
}
