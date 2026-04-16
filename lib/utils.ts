import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatSats(amountMsats: number): string {
  const sats = Math.floor(amountMsats / 1000);
  return sats.toLocaleString() + " sats";
}

export function formatFiat(amount: number, currency: string = "MXN"): string {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency,
  }).format(amount);
}
