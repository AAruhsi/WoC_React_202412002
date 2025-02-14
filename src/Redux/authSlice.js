import { createSlice } from "@reduxjs/toolkit";

// Initial state for authentication
const initialState = {
  isAuthenticated: false,
  userId: null, // Change from `user` (email) to `userId`
};

// Authentication slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      // Ensure the payload has a valid `userId`
      if (action.payload && action.payload.userId) {
        state.isAuthenticated = true;
        state.userId = action.payload.userId; // Use userId instead of email
      } else {
        console.error("Invalid payload received:", action.payload);
        throw new Error("Invalid payload for login action");
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userId = null; // Set userId to null on logout
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
