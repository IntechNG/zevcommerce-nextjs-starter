export interface MockOrder {
    id: string;
    orderNumber: string;
    totalAmount: number;
    currency: string;
    status: string;
    paymentStatus: string;
    createdAt: string;
    items: {
        productTitle: string;
        variantTitle: string | null;
        quantity: number;
        unitPrice: number;
    }[];
}

export const mockOrders: MockOrder[] = [
    {
        id: 'order_001',
        orderNumber: 'ORD-1042',
        totalAmount: 15900,
        currency: 'NGN',
        status: 'delivered',
        paymentStatus: 'paid',
        createdAt: '2025-12-15T10:30:00Z',
        items: [
            { productTitle: 'Essential Cotton Tee', variantTitle: 'Medium / White', quantity: 2, unitPrice: 3500 },
            { productTitle: 'Heavyweight Hoodie', variantTitle: 'Medium / Grey', quantity: 1, unitPrice: 8900 },
        ],
    },
    {
        id: 'order_002',
        orderNumber: 'ORD-1058',
        totalAmount: 12900,
        currency: 'NGN',
        status: 'processing',
        paymentStatus: 'paid',
        createdAt: '2026-01-20T14:15:00Z',
        items: [
            { productTitle: 'Leather Crossbody Bag', variantTitle: 'Tan', quantity: 1, unitPrice: 12900 },
        ],
    },
    {
        id: 'order_003',
        orderNumber: 'ORD-1071',
        totalAmount: 23400,
        currency: 'NGN',
        status: 'pending',
        paymentStatus: 'pending',
        createdAt: '2026-02-10T09:45:00Z',
        items: [
            { productTitle: 'Denim Jacket', variantTitle: 'Medium', quantity: 1, unitPrice: 11500 },
            { productTitle: 'Canvas Sneakers', variantTitle: 'US 10 / White', quantity: 1, unitPrice: 7900 },
            { productTitle: 'Merino Wool Beanie', variantTitle: 'Navy', quantity: 1, unitPrice: 2900 },
        ],
    },
];
