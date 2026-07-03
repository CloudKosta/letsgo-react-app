import { useState, useEffect } from "react";
import { api } from "../../../api/axiosInstance";

export function useMySchedule() {
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/api/schedules/my")
            .then((res) => setSchedules(res.data))
            .finally(() => setLoading(false));
    }, []);

    return { schedules, loading };
}