'use client';

import { useState } from 'react';
import { Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/contexts/ToastContext';
import { Button } from '@/components/ui/Button';

interface AddToCartButtonProps {
    variantId: string;
    productTitle: string;
}

export function AddToCartButton({ variantId, productTitle }: AddToCartButtonProps) {
    const { addItem, isLoading } = useCart();
    const { addToast } = useToast();
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = async () => {
        await addItem(variantId, quantity);
        addToast(`${productTitle} added to cart`);
    };

    return (
        <div className="flex flex-col gap-3">
            {/* Quantity Selector */}
            <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-text-primary">Quantity</label>
                <div className="flex items-center border border-border-light rounded-md">
                    <button
                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                        className="p-2 text-text-secondary hover:text-text-primary transition-colors"
                        aria-label="Decrease quantity"
                    >
                        <Minus size={16} />
                    </button>
                    <span className="w-10 text-center text-sm font-medium">{quantity}</span>
                    <button
                        onClick={() => setQuantity(q => q + 1)}
                        className="p-2 text-text-secondary hover:text-text-primary transition-colors"
                        aria-label="Increase quantity"
                    >
                        <Plus size={16} />
                    </button>
                </div>
            </div>

            {/* Add to Cart Button */}
            <Button
                variant="primary"
                size="lg"
                onClick={handleAddToCart}
                isLoading={isLoading}
                className="w-full"
            >
                <ShoppingBag size={18} className="mr-2" />
                Add to Cart
            </Button>
        </div>
    );
}
