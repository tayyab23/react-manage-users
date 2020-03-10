import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function scopeReducer(state = initialState.scope, action) {
  switch (action.type) {
    case types.LOAD_SCOPES_SUCCESS:
      return action.scope;
    default:
      return state;
  }
}
