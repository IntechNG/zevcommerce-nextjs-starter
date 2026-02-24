'use client';

import { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
import { AccountPageHeader } from '@/components/account/AccountPageHeader';
import { OrderCard } from '@/components/account/OrderCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { Skeleton } from '@/components/ui/Skeleton';
import { getOrders } from '@/lib/api/customer';
import { ROUTES } from '@/lib/constants';
import type { MockOrder } from '@/data/mock/orders';

export default function OrdersPage() {
    const [orders, setOrders] = useState<MockOrder[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getOrders({ page: 1, limit: 20 })
            .then(result => setOrders(result.data))
            .catch(() => { })
            .finally(() => setIsLoading(false));
    }, []);

    if (isLoading) {
        return (
            <div className="w-full space-y-8">
                <AccountPageHeader title="Orders" />
                <div className="w-full space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <Skeleton key={i} className="h-20 rounded-lg" />
                    ))}
                </div>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="w-full space-y-8">
                <AccountPageHeader title="Orders" />
                <EmptyState
                    icon={<ShoppingBag size={48} strokeWidth={1.5} />}
                    title="No orders yet"
                    description="When you place an order, it will appear here."
                    actionLabel="Browse Products"
                    actionHref={ROUTES.PRODUCTS}
                />
            </div>
        );
    }

    return (
        <div className="w-full space-y-8">
            <AccountPageHeader title="Orders" />
            <div className="w-full space-y-4">
                {orders.map(order => (
                    <OrderCard key={order.id} order={order} />
                ))}
            </div>
        </div>
    );
}
