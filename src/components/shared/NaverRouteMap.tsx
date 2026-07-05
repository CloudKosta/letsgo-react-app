import { useEffect, useRef } from "react";
import type { MapSchedule } from "../../types";
import { useNaverMaps } from "../../hooks/useNaverMaps";
import "./NaverRouteMap.css";

interface NaverRouteMapProps {
  maps: MapSchedule[];
  height?: number;
}

interface Point {
  lat: number;
  lng: number;
  title: string;
}

/** mapX(경도)/mapY(위도)를 방문 순서대로 좌표 배열로 변환(빈값/0 좌표 제외). */
function toPoints(maps: MapSchedule[]): Point[] {
  return [...maps]
    .sort((a, b) => Number(a.visitOrder) - Number(b.visitOrder))
    .map((m) => ({ lat: Number(m.mapY), lng: Number(m.mapX), title: m.title }))
    .filter((p) => p.lat > 0 && p.lng > 0);
}

function markerIcon(label: number) {
  return {
    content: `<div class="naver-route-marker">${label}</div>`,
    anchor: new window.naver.maps.Point(14, 14),
  };
}

/** 네이버 지도에 일정 동선(마커 + 경로선)을 표시하는 재사용 컴포넌트. */
export default function NaverRouteMap({ maps, height = 224 }: NaverRouteMapProps) {
  const { ready, error } = useNaverMaps();
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const overlaysRef = useRef<any[]>([]);

  useEffect(() => {
    if (!ready || !containerRef.current) return;
    const naver = window.naver;
    const points = toPoints(maps);
    if (points.length === 0) return;

    // 지도는 컨테이너당 한 번만 생성(재생성 시 마커/타일이 겹쳐 쌓이는 것 방지).
    if (!mapRef.current) {
      mapRef.current = new naver.maps.Map(containerRef.current, {
        center: new naver.maps.LatLng(points[0].lat, points[0].lng),
        zoom: 13,
      });
    }
    const map = mapRef.current;

    // 이전 마커/경로선 제거 후 다시 그린다.
    overlaysRef.current.forEach((o) => o.setMap(null));
    overlaysRef.current = [];

    const path = points.map((p) => new naver.maps.LatLng(p.lat, p.lng));
    points.forEach((p, i) => {
      overlaysRef.current.push(
        new naver.maps.Marker({ position: path[i], map, title: p.title, icon: markerIcon(i + 1) })
      );
    });

    if (points.length > 1) {
      overlaysRef.current.push(
        new naver.maps.Polyline({ map, path, strokeColor: "#2563eb", strokeWeight: 4, strokeOpacity: 0.8 })
      );
      const bounds = new naver.maps.LatLngBounds(path[0], path[0]);
      path.forEach((ll: unknown) => bounds.extend(ll));
      map.fitBounds(bounds);
    }
  }, [ready, maps]);

  // 언마운트 시에만 지도 파기.
  useEffect(() => {
    return () => {
      overlaysRef.current.forEach((o) => o.setMap(null));
      overlaysRef.current = [];
      mapRef.current?.destroy?.();
      mapRef.current = null;
    };
  }, []);

  if (error) {
    return <div className="naver-route-empty" style={{ height }}>지도를 불러올 수 없습니다.</div>;
  }
  if (maps.length === 0) {
    return <div className="naver-route-empty" style={{ height }}>지도에 표시할 장소가 없습니다.</div>;
  }
  return <div ref={containerRef} className="naver-route-map" style={{ height }} />;
}
