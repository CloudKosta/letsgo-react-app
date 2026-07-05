import { useCallback, useEffect, useState } from "react";
import { getMapSchedule } from "../../../api/myScheduleApi";
import type { MapSchedule } from "../../../types";

export function useMapSchedule(scheduleId?: string) {
  const [maps, setMaps] = useState<MapSchedule[]>([]);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (scheduleId === undefined) return;

    let ignore = false;
    getMapSchedule(scheduleId)
      .then((data) => !ignore && setMaps(data))
      .catch(() => !ignore && setMaps([]));
    return () => {
      ignore = true;
    };
  }, [scheduleId, reloadKey]);

  const reload = useCallback(() => setReloadKey((k) => k + 1), []);

  return { maps, reload };
}
