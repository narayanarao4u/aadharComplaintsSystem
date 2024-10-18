import axios from "axios";
function getBaseURL() {
  if (typeof window !== "undefined") {
    const { protocol, hostname } = window.location;
    return `${protocol}//${hostname}:5000/`;
  }
  // Fallback for server-side rendering or non-browser environments
  return "http://localhost:5000/";
}

// export const baseURL = "http://10.34.131.1:5000/";
// export const baseURL = "http://localhost:5000/";

export const baseURL = getBaseURL();

const api = axios.create({
  baseURL: baseURL,
});

export default api;
