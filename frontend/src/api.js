import axios from "axios";

export const baseURL = "http://10.34.131.1:5000/";
// export const baseURL = "http://localhost:5000/";

const api = axios.create({
  baseURL: baseURL,
});

export default api;
