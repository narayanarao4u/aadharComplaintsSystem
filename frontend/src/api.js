import axios from "axios";

export const baseURL = "http://localhost:5000/";

const api = axios.create({
  baseURL: baseURL,
});

export default api;
