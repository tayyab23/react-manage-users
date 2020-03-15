import { handleResponse, handleError } from "./apiUtils";
const sessionUrl = process.env.API_URL + "/sessions/";

export function getSessions() {
  return fetch(sessionUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function getSession(id) {
  return fetch(sessionUrl + id)
    .then(handleResponse)
    .catch(handleError);
}

export function saveSession(session) {
  // delete old session
  return getSessions()
    .then(sessions => {
      var sessionFound = false;
      var i = 0;
      while (!sessionFound && i < sessions.length) {
        sessionFound = session.id === sessions[i].id;
        i++;
      }
      sessionFound ? updateSession(session) : addNewSession(session);
    })
    .catch(handleError);
}

export function addNewSession(session) {
  fetch(sessionUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(session)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function updateSession(session) {
  fetch(sessionUrl + session.id, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(session)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteSession(id) {
  return fetch(sessionUrl + id, { method: "DELETE" }).then(handleResponse);
}
