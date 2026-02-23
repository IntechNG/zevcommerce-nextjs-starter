import { isDemoMode } from '@/lib/demo-mode';
import { zevClient } from '@/lib/zev-client';
import { mockEmptyCart } from '@/data/mock/cart';
import type { Cart, CartItemInput } from '@zevop/commerce-storefront';

export async function createCart(): Promise<Cart> {
    if (isDemoMode()) return { ...mockEmptyCart };
    return zevClient.cart.create();
}

export async function getCart(cartId: string, cartAccessToken: string): Promise<Cart> {
    if (isDemoMode()) return { ...mockEmptyCart, id: cartId, accessToken: cartAccessToken };
    return zevClient.cart.get(cartId, cartAccessToken);
}

export async function addCartLines(cartId: string, cartAccessToken: string, lines: CartItemInput[]): Promise<Cart> {
    if (isDemoMode()) return { ...mockEmptyCart, id: cartId, accessToken: cartAccessToken };
    return zevClient.cart.addLines(cartId, cartAccessToken, lines);
}

export async function updateCartLines(cartId: string, cartAccessToken: string, lines: CartItemInput[]): Promise<Cart> {
    if (isDemoMode()) return { ...mockEmptyCart, id: cartId, accessToken: cartAccessToken };
    return zevClient.cart.updateLines(cartId, cartAccessToken, lines);
}
