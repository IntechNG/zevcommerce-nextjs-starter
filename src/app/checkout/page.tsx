import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { formatPrice } from '@/lib/utils';
import { zevClient } from '@/lib/zev-client';

export const metadata = {
    title: 'Checkout | ZevCommerce',
    description: 'Complete your purchase securely.',
};

export default async function CheckoutPage() {
    const subtotal = 190.00;

    // Render a beautifully clean black-and-white checkout form
    return (
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:gap-x-12 xl:gap-x-16">

                {/* Checkout Form */}
                <div className="flex-1">
                    <h1 className="text-3xl font-extrabold tracking-tight text-brand mb-8">Checkout</h1>
                    <form className="space-y-12">

                        {/* Contact Info */}
                        <div>
                            <h2 className="text-lg font-medium text-brand">Contact information</h2>
                            <div className="mt-4">
                                <Input label="Email address" type="email" id="email" name="email" autoComplete="email" placeholder="you@example.com" />
                            </div>
                        </div>

                        {/* Shipping Info */}
                        <div className="pt-10 border-t border-border-light">
                            <h2 className="text-lg font-medium text-brand">Shipping details</h2>
                            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4">
                                <Input label="First name" id="first-name" name="first-name" autoComplete="given-name" />
                                <Input label="Last name" id="last-name" name="last-name" autoComplete="family-name" />
                                <div className="md:col-span-2">
                                    <Input label="Address" id="address" name="address" autoComplete="street-address" />
                                </div>
                                <Input label="City" id="city" name="city" autoComplete="address-level2" />
                                <Input label="Postal code" id="postal-code" name="postal-code" autoComplete="postal-code" />
                            </div>
                        </div>

                        {/* Payment (Placeholder for actual Paystack integration) */}
                        <div className="pt-10 border-t border-border-light">
                            <h2 className="text-lg font-medium text-brand">Payment Integration</h2>
                            <p className="mt-2 text-sm text-text-secondary">
                                ZevCommerce integrates seamlessly with Paystack or Stripe. The frontend triggers the payment modal, and then invokes <code>zevClient.checkout.verifyPayment()</code> to finalize the order.
                            </p>
                            <div className="mt-6 flex items-center justify-center p-8 border border-dashed border-border-light rounded-md bg-surface-hover">
                                <span className="text-text-secondary text-sm font-medium">Payment Gateway Component Placeholder</span>
                            </div>
                        </div>

                        <Button size="lg" className="w-full">
                            Pay now
                        </Button>
                    </form>
                </div>

                {/* Order Summary Sidebar */}
                <div className="mt-10 lg:mt-0 max-w-md w-full ml-auto">
                    <h2 className="text-lg font-medium text-brand mb-4">Order summary</h2>
                    <div className="rounded-lg border border-border-light bg-surface-hover px-4 py-6 sm:p-6 lg:p-8">
                        <dl className="space-y-4 text-sm text-text-secondary">
                            <div className="flex justify-between">
                                <dt>Subtotal</dt>
                                <dd className="font-medium text-brand">{formatPrice(subtotal)}</dd>
                            </div>
                            <div className="flex justify-between border-t border-border-light pt-4">
                                <dt>Shipping</dt>
                                <dd className="font-medium text-brand">Calculated</dd>
                            </div>
                            <div className="flex justify-between border-t border-brand/10 pt-4 text-brand">
                                <dt className="text-base font-bold">Total</dt>
                                <dd className="text-base font-bold">{formatPrice(subtotal)}</dd>
                            </div>
                        </dl>
                    </div>
                </div>

            </div>
        </div>
    );
}
