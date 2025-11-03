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

// src/services/auth.ts
export function logout() {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("userLogin");
  } finally {
    // ניתוב אחרי מחיקה (בחרי לאן)
    window.location.assign("/login"); // או "/" אם זה היעד שלך
  }
}

export function isLoggedIn() {
  return !!localStorage.getItem("token");
}

export function currentUser<T = any>(): T | null {
  const raw = localStorage.getItem("userLogin");
  return raw ? JSON.parse(raw) as T : null;
}

