import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./root-reducer";
import { enableMapSet } from "immer";

enableMapSet();

export const store = configureStore({
  reducer: rootReducer,
});
