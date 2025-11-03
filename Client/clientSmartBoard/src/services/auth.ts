// services/auth.ts
import jwtDecode from "jwt-decode";

export interface DecodedToken {
  id: string;
  iat: number;
  exp: number;
}

// פונקציה שמחזירה את פרטי המשתמש מתוך ה-token
export function getUserFromToken(): DecodedToken | null {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const decoded: DecodedToken = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error("❌ שגיאה בפענוח ה-token:", error);
    return null;
  }
}

// פונקציה שבודקת אם המשתמש מחובר
export function isLoggedIn(): boolean {
  const decoded = getUserFromToken();
  if (!decoded) return false;
  return decoded.exp * 1000 > Date.now(); // עדיין בתוקף
}
