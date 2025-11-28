import { combineReducers } from "@reduxjs/toolkit";
import { reducer as AuthReducer } from "src/slices/auth/auth";
import { reducer as AccountReducer } from "src/slices/account/account";

export const rootReducer = combineReducers({
  auth: AuthReducer,
  accounts: AccountReducer,
});
