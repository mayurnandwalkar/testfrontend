import axios from "axios";
import { getToken } from "src/store/localStorage";
const genreInstance = axios.create({
  baseURL: `${process.env.REACT_APP_DEV_API_URL}/genre`,
});
genreInstance.interceptors.request.use(
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

export default genreInstance;
