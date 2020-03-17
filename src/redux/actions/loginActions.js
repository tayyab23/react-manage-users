import * as types from "./actionTypes";
import * as userApi from "../../api/userApi";
import * as sessionApi from "../../api/sessionApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";
import { newSession } from "../../../tools/mockData";
import { loadUsersSuccess } from "./userActions";

export function loginSessionSuccess(session) {
  return { type: types.CREATE_SESSION_SUCCESS, session: session };
}

export function getSessionsSuccess(session) {
  return { type: types.GET_SESSION_SUCCESS, session };
}

export function deleteLoginSessionSuccess() {
  return { type: types.DELETE_SESSION_SUCCESS };
}

export function failLogin() {
  return { type: types.LOGIN_FAIL };
}

export function deleteSession(clientSession) {
  return function(dispatch) {
    dispatch(beginApiCall());
    sessionApi.deleteSession(clientSession.id).catch();
    dispatch(deleteLoginSessionSuccess(clientSession));
  };
}

export function initSession(session) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return sessionApi
      .addNewSession(session)
      .then(session => {
        dispatch(loginSessionSuccess(session));
      })
      .catch(error => {
        apiCallError(error);
        throw error;
      });
  };
}

export function validateUser(user) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return userApi
      .getUsers()
      .then(users => {
        dispatch(loadUsersSuccess(users));
        return returnNewSession(user, users);
      })
      .catch(error => {
        apiCallError(error);
        throw error;
      });
  };
}

export function returnNewSession(user, users) {
  const matchingUser = findUserInDbUsers(user, users);

  if (matchingUser != undefined && matchingUser.password === user.password) {
    return generateSessionJson(matchingUser);
  } else {
    return null;
  }
}

function generateSessionJson(user) {
  const session = newSession;
  session.string = Math.random()
    .toString(13)
    .replace("0.", "");
  session.expiresEpoch = Math.round(new Date().getTime() / 1000) + 30;
  session.id = user.id;
  session.loggedInAs = user.username;
  session.scopeId = user.scopeId;
  return session;
}

function findUserInDbUsers(user, users) {
  for (let i = 0; i < users.length; i++) {
    if (user.email == users[i].email) {
      return users[i];
    }
  }
}
