import * as types from "./actionTypes";
import * as scopeApi from "../../api/scopeApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadScopesSuccess(scope) {
  return { type: types.LOAD_AUTHORS_SUCCESS, scope };
}

export function loadScopes() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return scopeApi
      .getScopes()
      .then(scope => {
        dispatch(loadScopesSuccess(scope));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
