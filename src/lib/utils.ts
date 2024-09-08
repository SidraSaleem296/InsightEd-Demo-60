import { type ClassValue, clsx } from "clsx";
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
