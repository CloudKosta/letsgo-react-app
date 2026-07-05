import { useEffect, useState } from "react";

const CLIENT_ID = import.meta.env.VITE_NAVER_MAP_CLIENT_ID;
const SCRIPT_ID = "naver-maps-sdk";

/** SDK 스크립트를 앱 전체에서 한 번만 로드하기 위한 공유 Promise. */
let loadPromise: Promise<void> | null = null;

function loadSdk(): Promise<void> {
  if (window.naver?.maps) return Promise.resolve();
  if (loadPromise) return loadPromise;

  loadPromise = new Promise<void>((resolve, reject) => {
    if (!CLIENT_ID) {
      reject(new Error("VITE_NAVER_MAP_CLIENT_ID가 설정되지 않았습니다."));
      return;
    }
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${CLIENT_ID}`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("네이버 지도 SDK 로드에 실패했습니다."));
    document.head.appendChild(script);
  });
  return loadPromise;
}

/** 네이버 지도 SDK 로드 상태. { ready, error } */
export function useNaverMaps() {
  const [ready, setReady] = useState<boolean>(!!window.naver?.maps);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    loadSdk()
      .then(() => !ignore && setReady(true))
      .catch((e) => !ignore && setError(e.message));
    return () => {
      ignore = true;
    };
  }, []);

  return { ready, error };
}
