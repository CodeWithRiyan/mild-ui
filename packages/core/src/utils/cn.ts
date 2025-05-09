import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function for merging class names with Tailwind support
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Takes a base class name and conditionally adds a variant class name
 */
export function cond(baseClass: string, condition: boolean, variantClass: string) {
  return condition ? `${baseClass} ${variantClass}` : baseClass;
}