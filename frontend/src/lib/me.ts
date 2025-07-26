import api from "./api";
import { useAuth } from "@/stores/useAuth";

export const fetchMe = async () => {
  try {
    const res = await api.get("/users/me");
    return res.data;
  } catch {
    return null;
  }
};
