import { combineReducers } from "redux";
import { usersSlice } from "./users";
import { wizardSlice } from "./wizard";

export const rootReducer = combineReducers({
  users: usersSlice.reducer,
  wizard: wizardSlice.reducer,
});
