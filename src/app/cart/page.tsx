import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export const metadata = {
    title: 'Your Cart | ZevCommerce',
    description: 'Review your items before checkout.',
};

export default function CartPage() {
    // Static boilerplate UI for the Next.js starter until client-side cart SDK state is wired.
    const mockLines = [
        {
            id: '1',
            productTitle: 'Premium Cotton T-Shirt',
            variantTitle: 'Large / Black',
            quantity: 2,
            unitPrice: 35.0,
            lineTotal: 70.0,
        },
        {
            id: '2',
            productTitle: 'Minimalist Lether Wallet',
            variantTitle: 'Brown',
            quantity: 1,
            unitPrice: 120.0,
            lineTotal: 120.0,
        }
    ];

    const subtotal = 190.00;

    return (
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-extrabold tracking-tight text-brand mb-8">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* Cart Items */}
                <div className="lg:col-span-8">
                    <ul role="list" className="divide-y divide-border-light border-t border-border-light">
                        {mockLines.map((line) => (
                            <li key={line.id} className="flex py-6 sm:py-8">
                                <div className="flex-shrink-0 h-24 w-24 rounded-md border border-border-light bg-surface-hover items-center justify-center flex text-xs text-text-secondary">
                                    Image
                                </div>

                                <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                        <div>
                                            <div className="flex justify-between">
                                                <h3 className="text-sm font-medium text-text-primary hover:underline">
                                                    {line.productTitle}
                                                </h3>
                                            </div>
                                            <p className="mt-1 text-sm text-text-secondary">{line.variantTitle}</p>
                                            <p className="mt-1 text-sm font-medium text-brand">{formatPrice(line.unitPrice)}</p>
                                        </div>

                                        <div className="mt-4 sm:mt-0 sm:pr-9">
                                            <label htmlFor={`quantity-${line.id}`} className="sr-only">
                                                Quantity, {line.productTitle}
                                            </label>
                                            <select
                                                id={`quantity-${line.id}`}
                                                name={`quantity-${line.id}`}
                                                className="max-w-full rounded-md border border-border-light py-1.5 text-left text-base font-medium leading-5 text-text-primary shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand sm:text-sm"
                                                defaultValue={line.quantity}
                                            >
                                                {[1, 2, 3, 4, 5, 6, 7, 8].map((qty) => (
                                                    <option key={qty} value={qty}>
                                                        {qty}
                                                    </option>
                                                ))}
                                            </select>

                                            <div className="absolute right-0 top-0">
                                                <button type="button" className="-m-2 inline-flex p-2 text-text-secondary hover:text-text-primary">
                                                    <span className="sr-only">Remove</span>
                                                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                        <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-4">
                    <section aria-labelledby="summary-heading" className="rounded-lg bg-surface-hover px-4 py-6 sm:p-6 lg:p-8 border border-border-light">
                        <h2 id="summary-heading" className="text-lg font-medium text-brand">
                            Order summary
                        </h2>

                        <dl className="mt-6 space-y-4 text-sm text-text-secondary">
                            <div className="flex items-center justify-between">
                                <dt>Subtotal</dt>
                                <dd className="font-medium text-brand">{formatPrice(subtotal)}</dd>
                            </div>
                            <div className="flex items-center justify-between border-t border-border-light pt-4">
                                <dt>Shipping</dt>
                                <dd className="font-medium text-brand">Calculated at checkout</dd>
                            </div>
                            <div className="flex items-center justify-between border-t border-border-light pt-4">
                                <dt className="text-base font-medium text-brand">Order total</dt>
                                <dd className="text-base font-medium text-brand">{formatPrice(subtotal)}</dd>
                            </div>
                        </dl>

                        <div className="mt-6">
                            <Button size="lg" className="w-full">
                                Checkout
                            </Button>
                        </div>
                    </section>
                </div>

            </div>
        </div>
    );
}
