import { createSlice } from "@reduxjs/toolkit";
import { getMyEvents } from "../api/event";

const initialState = {
  events: [],
  loading: false,
  error: null,
};

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    getEventsStart(state) {
      state.loading = true;
    },
    getEventsSuccess(state, action) {
      state.events = action.payload;
      state.loading = false;
    },
    getEventsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getEventsStart, getEventsSuccess, getEventsFailure } =
  eventSlice.actions;

export const fetchEvents = (token) => async (dispatch) => {
  try {
    dispatch(getEventsStart());
    const response = await getMyEvents(token);
    dispatch(getEventsSuccess(response));
  } catch (error) {
    dispatch(getEventsFailure(error.message));
  }
};

export default eventSlice.reducer;
