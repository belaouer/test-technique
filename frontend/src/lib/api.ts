import axios from "axios";
import { useAuth } from "@/stores/useAuth";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const cookies = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));
    const token = cookies?.split("=")[1];
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default api;
