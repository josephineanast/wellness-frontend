import { createSlice } from "@reduxjs/toolkit";
import { getMyEvents } from "../api/event";
import { createEvent } from "../api/event";

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
    createEventStart(state) {
      state.loading = true;
    },
    createEventSuccess(state, action) {
      state.loading = false;
      state.events.push(action.payload);
    },
    createEventFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getEventsStart,
  getEventsSuccess,
  getEventsFailure,
  createEventStart,
  createEventSuccess,
  createEventFailure,
} = eventSlice.actions;

export const fetchEvents = (token) => async (dispatch) => {
  try {
    dispatch(getEventsStart());
    const response = await getMyEvents(token);
    dispatch(getEventsSuccess(response));
  } catch (error) {
    dispatch(getEventsFailure(error.message));
  }
};

export const createEventAction = (eventData, token) => async (dispatch) => {
  try {
    dispatch(createEventStart());
    const response = await createEvent(eventData, token);
    dispatch(createEventSuccess(response));
  } catch (error) {
    dispatch(createEventFailure(error.message));
  }
};

export default eventSlice.reducer;
