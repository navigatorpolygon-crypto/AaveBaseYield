import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatUnits } from "viem";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatAddress(address?: string) {
  if (!address) return null;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatBigInt(value: bigint, decimals: number, displayDecimals = 2) {
  const formatted = formatUnits(value, decimals);
  
  if (displayDecimals === 0) {
    return formatted.split('.')[0];
  }

  const [integer, fraction] = formatted.split('.');
  
  if (!fraction) {
    return integer;
  }
  
  const truncatedFraction = fraction.slice(0, displayDecimals);
  return `${integer}.${truncatedFraction.padEnd(displayDecimals, '0')}`;
}
