import axios from "axios";
import { config } from "../../../config";

export const registerUser = async (data) => {
  try {
    const response = await axios.post(`${config.apiHost}/auth/register`, data);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(`Registration failed: ${error.response.data.message}`);
    } else if (error.request) {
      throw new Error("Network error. Please check your internet connection.");
    } else {
      throw new Error("An error occurred while processing your request.");
    }
  }
};

export const loginUser = async (data) => {
  try {
    const response = await axios.post(`${config.apiHost}/auth/login`, data);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(`Login failed: ${error.response.data.message}`);
    } else if (error.request) {
      throw new Error("Network error. Please check your internet connection.");
    } else {
      throw new Error("An error occurred while processing your request.");
    }
  }
};

export const logoutUser = async () => {
  try {
    const token = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth")).token
      : "";

    const response = await axios.post(`${config.apiHost}/auth/logout`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    localStorage.removeItem("auth");
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(`Logout failed: ${error.response.data.message}`);
    } else if (error.request) {
      throw new Error("Network error. Please check your internet connection.");
    } else {
      throw new Error("An error occurred while processing your request.");
    }
  }
};
