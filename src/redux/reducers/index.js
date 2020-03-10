import { combineReducers } from "redux";
import users from "./userReducer";
import scope from "./scopeReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  users,
  scope,
  apiCallsInProgress
});

export default rootReducer;
