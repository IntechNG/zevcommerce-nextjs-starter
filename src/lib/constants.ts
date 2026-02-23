/** Route path constants */
export const ROUTES = {
    HOME: '/',
    PRODUCTS: '/products',
    PRODUCT: (slug: string) => `/products/${slug}`,
    COLLECTIONS: '/collections',
    COLLECTION: (handle: string) => `/collections/${handle}`,
    CART: '/cart',
    CHECKOUT: '/checkout',
    SEARCH: '/search',
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    ACCOUNT: '/account',
    ACCOUNT_ORDERS: '/account/orders',
    ACCOUNT_ORDER: (id: string) => `/account/orders/${id}`,
    ACCOUNT_ADDRESSES: '/account/addresses',
    ACCOUNT_PROFILE: '/account/profile',
    ACCOUNT_SECURITY: '/account/security',
    BLOG: '/blog',
    BLOG_ARTICLE: (slug: string) => `/blog/${slug}`,
    PAGE: (slug: string) => `/pages/${slug}`,
} as const;

/** Cookie/localStorage keys */
export const STORAGE_KEYS = {
    CART_ID: 'zev_cart_id',
    CART_TOKEN: 'zev_cart_token',
    CUSTOMER_TOKEN: 'zev_customer_token',
} as const;

/** Default pagination */
export const DEFAULT_PAGE_SIZE = 12;
