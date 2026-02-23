'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { formatPrice, formatDate } from '@/lib/utils';
import { getOrders } from '@/lib/api/customer';
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

const paymentVariant: Record<string, 'default' | 'success' | 'warning' | 'error' | 'info'> = {
    pending: 'warning',
    paid: 'success',
    failed: 'error',
    refunded: 'error',
};

export default function OrderDetailPage() {
    const params = useParams();
    const orderId = params.id as string;
    const [order, setOrder] = useState<MockOrder | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getOrders({ page: 1, limit: 100 })
            .then(result => {
                const found = result.data.find((o: MockOrder) => o.id === orderId);
                setOrder(found || null);
            })
            .catch(() => {})
            .finally(() => setIsLoading(false));
    }, [orderId]);

    if (isLoading) {
        return (
            <div className="space-y-4">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-40 rounded-lg" />
                <Skeleton className="h-32 rounded-lg" />
            </div>
        );
    }

    if (!order) {
        return (
            <div className="text-center py-12">
                <p className="text-text-secondary mb-4">Order not found</p>
                <Link href={ROUTES.ACCOUNT_ORDERS} className="text-sm text-brand hover:underline">
                    Back to Orders
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <Link
                    href={ROUTES.ACCOUNT_ORDERS}
                    className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary transition-colors mb-3"
                >
                    <ArrowLeft size={14} /> Back to Orders
                </Link>
                <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-xl font-semibold text-text-primary">{order.orderNumber}</h2>
                    <Badge variant={statusVariant[order.status] || 'default'}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                    <Badge variant={paymentVariant[order.paymentStatus] || 'default'}>
                        Payment: {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                    </Badge>
                </div>
                <p className="text-sm text-text-secondary mt-1">Placed on {formatDate(order.createdAt)}</p>
            </div>

            {/* Order Items */}
            <div className="rounded-lg border border-border-light overflow-hidden">
                <div className="px-4 py-3 bg-surface-hover border-b border-border-light">
                    <h3 className="text-sm font-semibold text-text-primary">Items</h3>
                </div>
                <div className="divide-y divide-border-light">
                    {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between px-4 py-3">
                            <div>
                                <p className="text-sm font-medium text-text-primary">{item.productTitle}</p>
                                {item.variantTitle && (
                                    <p className="text-xs text-text-secondary">{item.variantTitle}</p>
                                )}
                                <p className="text-xs text-text-secondary">Qty: {item.quantity}</p>
                            </div>
                            <span className="text-sm font-medium text-text-primary shrink-0 ml-4">
                                {formatPrice(item.unitPrice * item.quantity, order.currency)}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Order Total */}
            <div className="rounded-lg border border-border-light p-4">
                <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Total</span>
                    <span className="text-lg font-semibold text-text-primary">
                        {formatPrice(order.totalAmount, order.currency)}
                    </span>
                </div>
            </div>
        </div>
    );
}
