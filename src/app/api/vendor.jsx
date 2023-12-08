import axios from "axios";
import { config } from "../../../config";

export const getVendors = async () => {
  try {
    const response = await axios.get(`${config.apiHost}/api/users/vendors`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching vendors");
  }
};
