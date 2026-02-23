/**
 * Demo Mode Utility
 *
 * When NEXT_PUBLIC_DEMO_MODE is "true" (the default), all data-fetching
 * functions return static mock data so the storefront can be previewed
 * without a running ZevCommerce backend.
 *
 * Set NEXT_PUBLIC_DEMO_MODE=false and configure your API key to switch
 * to live data from your store.
 */

export function isDemoMode(): boolean {
    return process.env.NEXT_PUBLIC_DEMO_MODE !== 'false';
}
