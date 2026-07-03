export interface AuthUser {
  userID: string;
  id: number;
  name: string;
  email: string;
}

export function decodeToken(token: string): AuthUser | null {
  try {
    const payload = token.split(".")[1];
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(escape(atob(base64)));
    const claims = JSON.parse(json);
    return {
      userID: claims.sub,
      id: claims.id,
      name: claims.username,
      email: claims.email,
    };
  } catch {
    return null;
  }
}
