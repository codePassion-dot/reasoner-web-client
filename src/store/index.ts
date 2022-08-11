import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./slices/rootReducer";

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export default store;
