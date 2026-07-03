import { create } from "zustand";
import { tokenStorage } from "../api/tokenStorage";
import { decodeToken, type AuthUser } from "../api/decodeToken";

interface AuthState {
  user: AuthUser | null;
  isLoggedIn: boolean;
  setFromToken: (token: string) => void;
  logout: () => void;
}

const initialUser = (() => {
  const token = tokenStorage.get();
  return token ? decodeToken(token) : null;
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
