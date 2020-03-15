import { combineReducers } from "redux";
import users from "./userReducer";
import scope from "./scopeReducer";
import session from "./loginReducer"
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  users,
  scope,
  session,
  apiCallsInProgress
});

export default rootReducer;
