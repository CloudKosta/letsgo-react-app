import { create } from "zustand";
import { tokenStorage } from "../api/tokenStorage";
import { decodeToken, isTokenExpired, type AuthUser } from "../api/decodeToken";

interface AuthState {
  user: AuthUser | null;
  isLoggedIn: boolean;
  setFromToken: (token: string) => void;
  logout: () => void;
}

const initialUser = (() => {
  const token = tokenStorage.get();
  if (!token) return null;
  // 이미 만료된 토큰이면 로그아웃 상태로 시작하고, 안내 토스트 플래그를 남긴다.
  if (isTokenExpired(token)) {
    tokenStorage.clear();
    sessionStorage.setItem("sessionExpired", "1");
    return null;
  }
  return decodeToken(token);
})();

export const useAuthStore = create<AuthState>((set) => ({
  user: initialUser,
  isLoggedIn: initialUser !== null,
  setFromToken: (token) => {
    const user = decodeToken(token);
    set({ user, isLoggedIn: user !== null });
  },
  logout: () => {
    tokenStorage.clear();
    set({ user: null, isLoggedIn: false });
  },
}));
