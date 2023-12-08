import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authslice";
import eventReducer from "./features/eventSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    events: eventReducer,
  },
});
