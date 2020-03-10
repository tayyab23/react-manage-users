import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function userReducer(state = initialState.users, action) {
  switch (action.type) {
    case types.CREATE_COURSE_SUCCESS:
      return [...state, { ...action.user }];
    case types.UPDATE_COURSE_SUCCESS:
      return state.map(user =>
        user.id === action.user.id ? action.user : user
      );
    case types.LOAD_COURSES_SUCCESS:
      return action.users;
    case types.DELETE_COURSE_OPTIMISTIC:
      return state.filter(user => user.id !== action.user.id);
    default:
      return state;
  }
}
