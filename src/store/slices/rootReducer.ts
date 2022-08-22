import { combineReducers } from "redux";
import { usersSlice } from "./users";

export const rootReducer = combineReducers({
  users: usersSlice.reducer,
});
