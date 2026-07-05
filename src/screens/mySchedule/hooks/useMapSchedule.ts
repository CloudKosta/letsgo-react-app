import { useEffect, useState } from "react";
import { getMapSchedule } from "../../../api/myScheduleApi";
import type { MapSchedule } from "../../../types";

/** 일정의 경로 좌표(mapX/mapY) 목록을 불러온다. */
export function useMapSchedule(scheduleId?: number) {
  const [maps, setMaps] = useState<MapSchedule[]>([]);

  useEffect(() => {
    if (scheduleId === undefined) return;

    let ignore = false;
    getMapSchedule(scheduleId)
      .then((data) => !ignore && setMaps(data))
      .catch(() => !ignore && setMaps([]));
    return () => {
      ignore = true;
    };
  }, [scheduleId]);

  return maps;
}
