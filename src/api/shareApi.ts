import axios from "axios";
import { api } from "./axiosInstance";

export interface PublishRequest {
    myScheduleId: string;
    isAnonymous: boolean;
}

function getErrorMessage(e: unknown, fallback: string): string {
    if (axios.isAxiosError(e)) {
        return e.response?.data?.message ?? fallback;
    }
    return fallback;
}

export async function publishToSharedBoard({ myScheduleId, isAnonymous }: PublishRequest): Promise<string> {
    try {
        const res = await api.post<string>(`/myschedule/api/${myScheduleId}/share`, {
            isAnonymous: isAnonymous ? 1 : 0,
        });
        return res.data;
    } catch (e) {
        throw new Error(getErrorMessage(e, "게시에 실패했습니다."), { cause: e });
    }
}
