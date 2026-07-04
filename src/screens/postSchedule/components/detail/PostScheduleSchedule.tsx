import type { MapSchedule, RouteSchedule } from "../../../../types";
import PostScheduleRouteMap from "./PostScheduleRouteMap";
import PostScheduleRouteList from "./PostScheduleRouteList";

interface PostScheduleScheduleProps {
  maps: MapSchedule[];
  routes: RouteSchedule[];
}

export default function PostScheduleSchedule({ maps, routes }: PostScheduleScheduleProps) {
  return (
    <section className="post-schedule-detail-section">
      <PostScheduleRouteMap maps={maps} />
      <PostScheduleRouteList routes={routes} />
    </section>
  );
}
