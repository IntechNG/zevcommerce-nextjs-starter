'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { X, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { CartItem } from './CartItem';
import { CartSummary } from './CartSummary';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { ROUTES } from '@/lib/constants';

export function CartDrawer() {
    const { cart, isCartOpen, closeCart, isLoading } = useCart();

    useEffect(() => {
        if (isCartOpen) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isCartOpen]);

    if (!isCartOpen) return null;

    const lines = cart?.lines || [];
    const isEmpty = lines.length === 0;

    return (
        <div className="fixed inset-0 z-50">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/50 animate-fade-in" onClick={closeCart} />

            {/* Drawer */}
            <div className="fixed inset-y-0 right-0 w-full max-w-md bg-surface shadow-xl flex flex-col animate-slide-in-right">
                {/* Header */}
                <div className="flex items-center justify-between px-4 h-16 border-b border-border-light shrink-0">
                    <div className="flex items-center gap-2">
                        <ShoppingBag size={18} />
                        <span className="text-base font-semibold">Cart</span>
                        {cart && cart.totalItems > 0 && (
                            <span className="text-sm text-text-secondary">({cart.totalItems})</span>
                        )}
                    </div>
                    <button
                        onClick={closeCart}
                        className="p-2 text-text-secondary hover:text-text-primary transition-colors"
                        aria-label="Close cart"
                    >
                        <X size={22} />
                    </button>
                </div>

                {/* Content */}
                {isEmpty ? (
                    <div className="flex-1 flex items-center justify-center">
                        <EmptyState
                            icon={<ShoppingBag size={48} strokeWidth={1.5} />}
                            title="Your cart is empty"
                            description="Looks like you haven't added anything yet. Start browsing to find something you love."
                            actionLabel="Continue Shopping"
                            actionHref={ROUTES.PRODUCTS}
                        />
                    </div>
                ) : (
                    <>
                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                            {lines.map((line) => (
                                <CartItem key={line.variantId} line={line} />
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="border-t border-border-light px-4 py-4 space-y-4 shrink-0">
                            <CartSummary cart={cart!} />
                            <div className="grid grid-cols-2 gap-3">
                                <Link href={ROUTES.CART} onClick={closeCart}>
                                    <Button variant="outline" className="w-full">View Cart</Button>
                                </Link>
                                <Link href={ROUTES.CHECKOUT} onClick={closeCart}>
                                    <Button variant="primary" className="w-full">Checkout</Button>
                                </Link>
                            </div>
                        </div>
                    </>
                )}

                {/* Loading overlay */}
                {isLoading && (
                    <div className="absolute inset-0 bg-surface/50 flex items-center justify-center">
                        <div className="h-6 w-6 animate-spin rounded-full border-2 border-brand border-t-transparent" />
                    </div>
                )}
            </div>
        </div>
    );
}
