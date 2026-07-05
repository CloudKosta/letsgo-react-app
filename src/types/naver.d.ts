/**
 * 네이버 지도 JS SDK 전역. 공식 타입 패키지(@types/navermaps)를 쓰지 않으므로
 * 필요한 부분만 any로 느슨하게 선언한다.
 */
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    naver?: any;
  }
}

export {};
