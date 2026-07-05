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

/**
 * 내 일정을 공개게시판에 게시한다. owner 전용.
 * 백엔드 ShareRequest.isAnonymous 는 int(0/1) 이므로 boolean 을 변환해 보낸다.
 * @returns 생성된 게시글 id(postId)
 */
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
