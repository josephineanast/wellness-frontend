import { createSlice } from "@reduxjs/toolkit";

const loadAuthFromStorage = () => {
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");

  return {
    user: storedUser ? JSON.parse(storedUser) : null,
    token: storedToken || null,
    loading: false,
    error: null,
  };
};

const initialState = loadAuthFromStorage();
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
    },
    loginSuccess(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;

      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    registerStart(state) {
      state.loading = true;
    },
    registerSuccess(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;

      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },
    registerFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logoutStart(state) {
      state.loading = true;
    },
    logoutSuccess(state) {
      state.user = null;
      state.token = null;
      state.loading = false;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    logoutFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure,
} = authSlice.actions;
export default authSlice.reducer;
