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

export function validateClientSession(clientSession) {
  return sessionApi.getSession(clientSession.id).then(dbSession => {
    if (clientSession.string === dbSession.string) {
      return dbSession.expiresEpoch >= dbSession.expiresEpoch;
    } else {
      return false;
    }
  });
}

// export function initSession(session) {
//   debugger;
//   return function(dispatch) {
//     dispatch(beginApiCall());
//     return sessionApi.getSessions().then(allSessions => {
//       debugger;
//       const sessionFound = checkIfMySessionIsFoundAmongAllSessions(
//         session,
//         allSessions
//       );
//       dispatch(getSessionsSuccess(session));
//       dispatch(beginApiCall());
//       if (sessionFound) {
//         sessionApi.updateSession(session).then(session => {
//           dispatch(updateLoginSuccess(session));
//         });
//       } else {
//         sessionApi.addNewSession(session).then(session => {
//           dispatch(updateLoginSuccess(session));
//         });
//       }
//     });
//   };
// }

// export function checkIfMySessionIsFoundAmongAllSessions(session, allSessions) {
//   var sessionFound = false;
//   var i = 0;
//   while (!sessionFound && i < allSessions.length) {
//     sessionFound = session.id === allSessions[i].id;
//     i++;
//   }
//   return sessionFound;
// }

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
  session.scopeId = user.scopeId;
  return session;
}

function findUserInDbUsers(user, users) {
  for (let i = 0; i < users.length; i++) {
    if (user.username == users[i].email || user.username == users[i].username) {
      return users[i];
    }
  }
}
