import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/scope/";

export function getScopes() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}
