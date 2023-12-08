import axios from "axios";
import { config } from "../../../config";

const getRequestConfig = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const createEvent = async (eventData, token) => {
  try {
    const response = await axios.post(
      `${config.apiHost}/api/events/create`,
      eventData,
      getRequestConfig(token)
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(`Event creation failed: ${error.response.data.error}`);
    } else if (error.request) {
      throw new Error("Network error. Please check your internet connection.");
    } else {
      throw new Error("An error occurred while processing your request.");
    }
  }
};

export const getEvent = async (eventId, token) => {
  try {
    const response = await axios.get(
      `${config.apiHost}/api/events/${eventId}`,
      getRequestConfig(token)
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(`Failed to fetch event: ${error.response.data.error}`);
    } else if (error.request) {
      throw new Error("Network error. Please check your internet connection.");
    } else {
      throw new Error("An error occurred while processing your request.");
    }
  }
};

export const getMyEvents = async (token) => {
  try {
    const response = await axios.get(
      `${config.apiHost}/api/events/my-events`,
      getRequestConfig(token)
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(`Failed to fetch events: ${error.response.data.error}`);
    } else if (error.request) {
      throw new Error("Network error. Please check your internet connection.");
    } else {
      throw new Error("An error occurred while processing your request.");
    }
  }
};

export const approveEvent = async (eventId, date, token) => {
  try {
    const response = await axios.put(
      `${config.apiHost}/api/events/${eventId}/approve`,
      { date },
      getRequestConfig(token)
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(`Event approval failed: ${error.response.data.error}`);
    } else if (error.request) {
      throw new Error("Network error. Please check your internet connection.");
    } else {
      throw new Error("An error occurred while processing your request.");
    }
  }
};

export const rejectEvent = async (eventId, remarks, token) => {
  try {
    const response = await axios.put(
      `${config.apiHost}/api/events/${eventId}/reject`,
      { remarks },
      getRequestConfig(token)
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(`Event rejection failed: ${error.response.data.error}`);
    } else if (error.request) {
      throw new Error("Network error. Please check your internet connection.");
    } else {
      throw new Error("An error occurred while processing your request.");
    }
  }
};
