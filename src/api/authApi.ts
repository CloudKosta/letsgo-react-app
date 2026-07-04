import { api } from "./axiosInstance";
import { tokenStorage } from "./tokenStorage";
import { useAuthStore } from "../store/authStore";

export interface LoginRequest {
  userID: string;
  password: string;
}

export async function login(userID: string, password: string) {
  const res = await api.post("/login", { userID, password });

  const authHeader = res.headers["authorization"];
  if (!authHeader) {
    throw new Error("응답 헤더에 Authorization 토큰이 없습니다.");
  }

  const token = authHeader.replace(/^Bearer\s+/i, "");
  tokenStorage.set(token);
  useAuthStore.getState().setFromToken(token);
  return res.data;
}

export function logout() {
  useAuthStore.getState().logout();
}
