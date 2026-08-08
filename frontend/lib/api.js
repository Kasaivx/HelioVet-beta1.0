import axios from "axios";

export const api = axios.create({
    baseURL:"http://localhost:5001",
      withCredentials: true,
    }
);

api.interceptors.request.use((config) => {
  if (globalThis.window !== undefined) {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});


