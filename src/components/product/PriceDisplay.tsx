import { formatPrice } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface PriceDisplayProps {
    price: number;
    compareAtPrice?: number | null;
    currency?: string;
    size?: 'sm' | 'md' | 'lg';
}

export function PriceDisplay({ price, compareAtPrice, currency = 'NGN', size = 'md' }: PriceDisplayProps) {
    const hasDiscount = compareAtPrice && compareAtPrice > price;

    return (
        <div className="flex items-center gap-2">
            <span className={cn(
                'font-semibold text-brand',
                size === 'sm' && 'text-sm',
                size === 'md' && 'text-base',
                size === 'lg' && 'text-xl',
            )}>
                {formatPrice(price, currency)}
            </span>
            {hasDiscount && (
                <span className={cn(
                    'text-text-secondary line-through',
                    size === 'sm' && 'text-xs',
                    size === 'md' && 'text-sm',
                    size === 'lg' && 'text-base',
                )}>
                    {formatPrice(compareAtPrice, currency)}
                </span>
            )}
            {hasDiscount && (
                <span className="text-xs font-medium text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                    {Math.round(((compareAtPrice - price) / compareAtPrice) * 100)}% off
                </span>
            )}
        </div>
    );
}
