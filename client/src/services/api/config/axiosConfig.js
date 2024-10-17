import axios from "axios";

const base_url = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: base_url,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export { apiClient, base_url };
