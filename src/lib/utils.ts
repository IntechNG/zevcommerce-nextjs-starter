import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatPrice(amount: number, currency: string = 'NGN') {
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency,
        minimumFractionDigits: 0,
    }).format(amount);
}

export function formatDate(dateString: string): string {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(new Date(dateString));
}

export function truncate(str: string, length: number): string {
    if (str.length <= length) return str;
    return str.slice(0, length) + '...';
}

export function getMediaUrl(mediaJson: unknown): string {
    if (Array.isArray(mediaJson) && mediaJson.length > 0) {
        return mediaJson[0]?.url || '';
    }
    return '';
}

export function getAllMediaUrls(mediaJson: unknown): { url: string; alt: string }[] {
    if (Array.isArray(mediaJson)) {
        return mediaJson.map(m => ({ url: m?.url || '', alt: m?.alt || '' }));
    }
    return [];
}
