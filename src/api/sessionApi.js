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

export function addNewSession(session) {
  return fetch(sessionUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(session)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function updateSession(session) {
  return fetch(sessionUrl + session.id, {
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
