export function saveToLocalStorage<T>(key: string, value: T): void {
  try {
    const jsonValue = JSON.stringify(value);
    localStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error("❌ שמירה ל-localStorage נכשלה:", error);
  }
}

export function getFromLocalStorage<T>(key: string): T | false {
  try {
    const jsonValue = localStorage.getItem(key);
    if (!jsonValue) return false; 
    return JSON.parse(jsonValue) as T;
  } catch (error) {
    console.error("❌ קריאה מ-localStorage נכשלה:", error);
    return false;
  }
}

export function removeFromLocalStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("❌ מחיקה מ-localStorage נכשלה:", error);
  }
}

export function clearLocalStorage(): void {
  try {
    localStorage.clear();
  } catch (error) {
    console.error("❌ ניקוי localStorage נכשל:", error);
  }
}