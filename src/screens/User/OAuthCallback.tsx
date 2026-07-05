import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { tokenStorage } from "../../api/tokenStorage";
import { useAuthStore } from "../../store/authStore";

function OAuthCallback() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const token = searchParams.get("token");
        if (token) {
            tokenStorage.set(token);
            useAuthStore.getState().setFromToken(token);
            navigate("/mySchedule", { replace: true });
        } else {
            navigate("/user/login", { replace: true });
        }
    }, [searchParams, navigate]);

    return (
        <div className="flex items-center justify-center w-full h-full text-[#868e96]">
            로그인 처리 중...
        </div>
    );
}

export default OAuthCallback;
