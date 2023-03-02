import axios from "axios";
import { getToken } from "src/store/localStorage";
const floowInstance = axios.create({
  baseURL: `${process.env.REACT_APP_DEV_API_URL}/follow`,
});
floowInstance.interceptors.request.use(
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

export default floowInstance;
