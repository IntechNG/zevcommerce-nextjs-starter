import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { formatPrice, formatDate } from '@/lib/utils';
import { ROUTES } from '@/lib/constants';
import type { MockOrder } from '@/data/mock/orders';

const statusVariant: Record<string, 'default' | 'success' | 'warning' | 'error' | 'info'> = {
    pending: 'warning',
    processing: 'info',
    shipped: 'info',
    delivered: 'success',
    cancelled: 'error',
    refunded: 'error',
};

export function OrderCard({ order }: { order: MockOrder }) {
    return (
        <Link
            href={ROUTES.ACCOUNT_ORDER(order.id)}
            className="block rounded-lg border border-border-light hover:border-brand/20 hover:bg-surface-hover transition-colors"
        >
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4 min-w-0">
                    <div className="min-w-0">
                        <p className="text-sm font-semibold text-text-primary">{order.orderNumber}</p>
                        <p className="text-xs text-text-secondary mt-0.5">{formatDate(order.createdAt)}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-semibold text-text-primary">{formatPrice(order.totalAmount, order.currency)}</p>
                        <p className="text-xs text-text-secondary">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</p>
                    </div>
                    <Badge variant={statusVariant[order.status] || 'default'}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                    <ArrowRight size={14} className="text-text-secondary" />
                </div>
            </div>
            <div className="px-4 pb-4 sm:hidden">
                <p className="text-sm font-semibold text-text-primary">{formatPrice(order.totalAmount, order.currency)}</p>
            </div>
        </Link>
    );
}
