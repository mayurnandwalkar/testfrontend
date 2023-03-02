import axios from "axios";
import { getToken } from "src/store/localStorage";
const subscriptionInstance = axios.create({
  baseURL: `${process.env.REACT_APP_DEV_API_URL}/subscription`,
});
subscriptionInstance.interceptors.request.use(
  async (config) => {
    config.headers = {
      Authorization: `Bearer ${getToken()}`,
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default subscriptionInstance;
