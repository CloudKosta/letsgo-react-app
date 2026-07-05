import axios from "axios";
import { tokenStorage } from "./tokenStorage";
import { isTokenExpired } from "./decodeToken";

const LOGIN_PATH = "/user/login";
let loggingOut = false;

/**
 * 만료/무효 세션을 정리하고 로그인 페이지로 유도한다.
 * 동시 요청이 여러 개여도 리다이렉트가 한 번만 일어나도록 가드한다.
 */
export function forceLogout() {
    if (loggingOut) return;
    loggingOut = true;
    tokenStorage.clear();
    // 새로고침 후 로그인 화면에서 안내 토스트를 띄우기 위한 플래그
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
        // 만료된 토큰이면 서버에 보내지 않고 즉시 로그아웃 처리한다.
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
        // 서버가 인증 실패로 401을 주는 경우도 대비(403은 정상적인 권한 부족에도 쓰이므로 제외).
        if (error.response?.status === 401) {
            forceLogout();
        }
        return Promise.reject(error);
    }
);
