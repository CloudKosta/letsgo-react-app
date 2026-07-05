import axios from "axios";
import { tokenStorage } from "./tokenStorage";
import { isTokenExpired } from "./decodeToken";

const LOGIN_PATH = "/user/login";
let loggingOut = false;

export function forceLogout() {
    if (loggingOut) return;
    loggingOut = true;
    tokenStorage.clear();
    sessionStorage.setItem("sessionExpired", "1");
    if (window.location.pathname !== LOGIN_PATH) {
        window.location.assign(LOGIN_PATH);
    }
}

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use((config) => {
    const token = tokenStorage.get();
    if (token) {
        if (isTokenExpired(token)) {
            forceLogout();
            return Promise.reject(new Error("SESSION_EXPIRED"));
        }
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (res) => res,
    (error) => {
        if (error.response?.status === 401) {
            forceLogout();
        }
        return Promise.reject(error);
    }
);
