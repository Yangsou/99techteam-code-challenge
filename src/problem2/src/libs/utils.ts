import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function getIconPath(icon: string) {
  return `https://raw.githubusercontent.com/Switcheo/token-icons/refs/heads/main/tokens/${icon}.svg`
}