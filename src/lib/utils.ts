import { type ClassValue, clsx } from "clsx";
import { env } from "process";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export function cn(...classes: (string | undefined | null | false)[]) {
//   return classes.filter(Boolean).join(' ');
// }

export function formatTimeDelta(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds - hours * 3600) / 60);
  const secs = Math.floor(seconds - hours * 3600 - minutes * 60);
  const parts = [];
  if (hours > 0) {
    parts.push(`${hours}h`);
  }
  if (minutes > 0) {
    parts.push(`${minutes}m`);
  }
  if (secs > 0) {
    parts.push(`${secs}s`);
  }
  return parts.join(" ");
}


export function formatDate(input: string | number | Date): string {
  const date = input instanceof Date ? input : new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}
export function dateRangeParams(searchParams: { from: string; to: string }) {
  if (
    !searchParams.from ||
    isNaN(Date.parse(searchParams.from)) ||
    !searchParams.to ||
    isNaN(Date.parse(searchParams.to))
  ) {
    const dateRange = {
      from: new Date(),
      to: new Date(),
    }
    const oneYearAgo = new Date()
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
    dateRange.from = oneYearAgo

    return dateRange
  }

  return {
    from: new Date(searchParams.from),
    to: new Date(searchParams.to),
  }
}

export function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`
}


// import { type ClassValue, clsx } from "clsx";
// import { twMerge } from "tailwind-merge";

// export function cn(...inputs: (ClassValue | string | undefined | null | false)[]): string {
//   // Filter out falsey values and use twMerge and clsx
//   return twMerge(clsx(inputs.filter(Boolean)));
// }

// export function formatTimeDelta(seconds: number): string {
//   const hours = Math.floor(seconds / 3600);
//   const minutes = Math.floor((seconds - hours * 3600) / 60);
//   const secs = Math.floor(seconds - hours * 3600 - minutes * 60);
//   const parts = [];
//   if (hours > 0) {
//     parts.push(`${hours}h`);
//   }
//   if (minutes > 0) {
//     parts.push(`${minutes}m`);
//   }
//   if (secs > 0) {
//     parts.push(`${secs}s`);
//   }
//   return parts.join(" ");
// }
