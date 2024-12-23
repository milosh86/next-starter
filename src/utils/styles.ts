import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// TODO: this might belong somewhere else
export const linkClassesTw = 'text-blue-500 hover:text-blue-800 underline';

export const foregroundSecondary = 'text-foreground/50';
