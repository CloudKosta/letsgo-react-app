import axios from "axios";
import { api } from "./axiosInstance";

function toForm(data: Record<string, string>) {
  return new URLSearchParams(data);
}

function getErrorMessage(e: unknown, fallback: string): string {
  if (axios.isAxiosError(e)) {
    return e.response?.data?.message ?? fallback;
  }
  return fallback;
}

export async function findId(name: string, email: string): Promise<string> {
  try {
    const res = await api.post("/user/api/getIdAjax", toForm({ name, email }));
    return res.data.userId;
  } catch (e) {
    throw new Error(getErrorMessage(e, "일치하는 회원 정보를 찾을 수 없습니다."));
  }
}

export interface SignUpData {
  userID: string;
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export async function signUp(data: SignUpData): Promise<void> {
  try {
    await api.post("/user/api/signUpAjax", toForm({ ...data }));
  } catch (e) {
    throw new Error(getErrorMessage(e, "회원가입에 실패했습니다."));
  }
}

export interface UpdatePwData {
  userID: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export async function updatePassword(data: UpdatePwData): Promise<void> {
  try {
    await api.post("/user/api/updatePwAjax", toForm({ ...data }));
  } catch (e) {
    throw new Error(getErrorMessage(e, "비밀번호 변경에 실패했습니다."));
  }
}
