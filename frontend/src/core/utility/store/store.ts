import { configureStore } from "@reduxjs/toolkit";
import { authSliceReducer } from "../slices/authSlice";
import { commonServices } from "../services/service";

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    [commonServices.reducerPath]: commonServices.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(commonServices.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
