import { DayData } from './types';

const STORAGE_KEY = 'betting-tracker-data';

export function getAllDays(): DayData[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveDayData(dayData: DayData): void {
  const allDays = getAllDays();
  const existingIndex = allDays.findIndex(d => d.date === dayData.date);
  
  if (existingIndex >= 0) {
    allDays[existingIndex] = dayData;
  } else {
    allDays.push(dayData);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allDays));
}

export function getDayData(date: string): DayData | null {
  const allDays = getAllDays();
  return allDays.find(d => d.date === date) || null;
}

export function getTotalProfit(): number {
  const allDays = getAllDays();
  return allDays.reduce((sum, day) => sum + day.netProfit, 0);
}

export function deleteDayData(date: string): void {
  const allDays = getAllDays();
  const filtered = allDays.filter(d => d.date !== date);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}
