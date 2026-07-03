import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../../api/authApi";

export function useLogin() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (userID: string, password: string) => {
        try {
            setLoading(true);
            setErrorMessage("");
            await login(userID, password);
            navigate("/mySchedule");
        } catch {
            setErrorMessage("아이디 또는 비밀번호를 확인해주세요.");
        } finally {
            setLoading(false);
        }
    };

    return { errorMessage, loading, handleLogin };
}

export default useLogin;
