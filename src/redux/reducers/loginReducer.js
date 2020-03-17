import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function loginReducer(state = initialState.session, action) {
  switch (action.type) {
    case types.CREATE_SESSION_SUCCESS:
      return action.session;
    case types.GET_SESSION_SUCCESS:
      return state;
    case types.DELETE_SESSION_SUCCESS:
      return {};
    case types.LOGIN_FAIL:
      return state.filter(session => session.id !== action.session.id);
    default:
      return state;
  }
}
