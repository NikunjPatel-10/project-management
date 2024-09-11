import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  isAdminRole: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setIsAdminRole: (state, action) => {
      state.isAdminRole = action.payload;
    },
  },
});

export const { setIsAuthenticated, setIsAdminRole } = authSlice.actions;
export const authSliceReducer = authSlice.reducer;
