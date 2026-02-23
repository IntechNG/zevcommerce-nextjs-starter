'use client';

import Link from 'next/link';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { CartItem } from '@/components/cart/CartItem';
import { CartSummary } from '@/components/cart/CartSummary';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/lib/constants';

export default function CartPage() {
    const { cart, isLoading } = useCart();

    const lines = cart?.lines || [];
    const isEmpty = lines.length === 0;

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary mb-8">
                Shopping Cart
            </h1>

            {isEmpty ? (
                <EmptyState
                    icon={<ShoppingBag size={48} strokeWidth={1.5} />}
                    title="Your cart is empty"
                    description="Looks like you haven't added anything yet. Start browsing to find something you love."
                    actionLabel="Continue Shopping"
                    actionHref={ROUTES.PRODUCTS}
                />
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {lines.map(line => (
                            <div key={line.variantId} className="border-b border-border-light pb-4">
                                <CartItem line={line} />
                            </div>
                        ))}
                        <Link
                            href={ROUTES.PRODUCTS}
                            className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary transition-colors mt-4"
                        >
                            <ArrowLeft size={14} />
                            Continue Shopping
                        </Link>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 border border-border-light rounded-lg p-6 space-y-6">
                            <h2 className="text-lg font-semibold text-text-primary">Order Summary</h2>
                            <CartSummary cart={cart!} />
                            <Link href={ROUTES.CHECKOUT}>
                                <Button variant="primary" size="lg" className="w-full" disabled={isLoading}>
                                    Proceed to Checkout
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
