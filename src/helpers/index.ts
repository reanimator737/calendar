import { DAYS, MONTH } from '../const';

export function getRandomColor(): string {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

export function getInfoFromDate(date: string): { day: number; dayOfWeek: string; monthName: string } {
  const newDate = new Date(date);
  const day = newDate.getDate();

  const dayOfWeek = DAYS[newDate.getDay()].slice(0, 3);
  const monthName = MONTH[newDate.getMonth()].slice(0, 3);

  return { day, dayOfWeek, monthName };
}

export function getMonthNumber(date: string): number {
  return MONTH.findIndex((value) => date === value);
}

export function parseDateToNumbers(date: string): [number, number, number] {
  const [year, month, day] = date.split('-');
  return [+year, +month, +day];
}

export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function containsOnlyDigits(inputString: string): boolean {
  return /^\d+$/.test(inputString);
}

export function findAllArrays<T, E>(obj: T): E[] {
  const arrays: E[] = [];

  if (Array.isArray(obj)) {
    obj.forEach((el) => arrays.push(el));
  } else if (typeof obj === 'object' && obj !== null) {
    for (const key in obj) {
      const subArrays = findAllArrays<T, E>(obj[key] as T);
      arrays.push(...subArrays);
    }
  }

  return arrays;
}
