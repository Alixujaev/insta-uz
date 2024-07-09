import { combineReducers } from "redux";
import { userReducer } from "./user";
import { settingsReducer } from "./settings";
import { chatReducer } from "./chat";

export const rootReducer = combineReducers({
  user: userReducer,
  settings: settingsReducer,
  chat: chatReducer
})