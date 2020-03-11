import { handleResponse, handleError } from "./apiUtils";
const cookieUrl = process.env.API_URL + "/cookies/";

export function validateCookie(clientCookie) {
  const dbCookie = fetch(cookieUrl + clientCookie.id)
    .then(handleResponse)
    .catch(handleError);
  if (clientCookie.cookie == dbCookie.cookie) {
    return dbCookie.expiresEpoch >= dbCookie.expiresEpoch;
  }
  return false;
}

export function saveCookie(cookie) {
  // delete old cookie
  deleteCookie(cookie.id);
  // add new cookie
  return fetch(cookieUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(cookie)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteCookie(id) {
  return fetch(cookieUrl + id, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
