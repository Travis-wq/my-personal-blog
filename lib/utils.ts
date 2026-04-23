import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const zhDateFormatter = new Intl.DateTimeFormat("zh-CN", {
  timeZone: "UTC",
  year: "numeric",
  month: "long",
  day: "numeric",
});

export function formatDate(dateString: string): string {
  const dateOnlyMatch = dateString.match(/^(\d{4})-(\d{2})-(\d{2})$/);

  if (dateOnlyMatch) {
    const [, year, month, day] = dateOnlyMatch;
    const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
    return zhDateFormatter.format(date);
  }

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return zhDateFormatter.format(date);
}

export function calculateReadingTime(content: string): string {
  const cjkCharacterCount = (content.match(/[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/g) ?? [])
    .length;
  const latinWordCount = (content.match(/[A-Za-z0-9]+(?:['-][A-Za-z0-9]+)*/g) ?? []).length;
  const readingUnitsPerMinute = 300;
  const readingUnits = cjkCharacterCount + latinWordCount;
  const minutes = Math.max(1, Math.ceil(readingUnits / readingUnitsPerMinute));

  return `${minutes} 分钟`;
}
