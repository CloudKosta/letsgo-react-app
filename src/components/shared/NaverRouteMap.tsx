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

    if (!mapRef.current) {
      mapRef.current = new naver.maps.Map(containerRef.current, {
        center: new naver.maps.LatLng(points[0].lat, points[0].lng),
        zoom: 13,
      });
    }
    const map = mapRef.current;

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
