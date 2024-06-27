import { combineReducers } from "redux";
import { userReducer } from "./user";
import { settingsReducer } from "./settings";

export const rootReducer = combineReducers({
  user: userReducer,
  settings: settingsReducer
})