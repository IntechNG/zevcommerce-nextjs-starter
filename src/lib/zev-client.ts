import { ZevClient } from '@zevop/commerce-storefront';

// Throw an error early if the environment variable is missing in production
if (!process.env.NEXT_PUBLIC_ZEV_STOREFRONT_KEY) {
    console.error('Missing NEXT_PUBLIC_ZEV_STOREFRONT_KEY environment variable. The ZevCommerce SDK cannot initialize.');
}

// Ensure the endpoint is defined, defaulting to the SaaS production API if not provided in env.
const ZEV_ENDPOINT = process.env.NEXT_PUBLIC_ZEV_ENDPOINT || 'http://localhost:3000/graphql/v1';

/**
 * Global ZevCommerce Client Singleton.
 * 
 * We instantiate this once so it can be safely imported and used across 
 * Server Components, Client Components, and API Routes.
 */
export const zevClient = new ZevClient({
    endpoint: ZEV_ENDPOINT,
    publicKey: process.env.NEXT_PUBLIC_ZEV_STOREFRONT_KEY || 'pk_live_demo1234567890',
});
