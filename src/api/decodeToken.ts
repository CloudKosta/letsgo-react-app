export interface AuthUser {
  userID: string;
  id: number;
  name: string;
  email: string;
}

function parseClaims(token: string): Record<string, unknown> | null {
  try {
    const payload = token.split(".")[1];
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(decodeURIComponent(escape(atob(base64))));
  } catch {
    return null;
  }
}

export function decodeToken(token: string): AuthUser | null {
  const claims = parseClaims(token);
  if (!claims) return null;
  return {
    userID: claims.sub as string,
    id: claims.id as number,
    name: claims.username as string,
    email: claims.email as string,
  };
}

export function isTokenExpired(token: string): boolean {
  const claims = parseClaims(token);
  if (!claims || typeof claims.exp !== "number") return true;
  return Date.now() >= claims.exp * 1000;
}
