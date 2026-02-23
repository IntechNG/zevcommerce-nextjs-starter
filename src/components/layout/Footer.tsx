import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-border-light bg-surface">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <span className="text-lg font-bold text-brand">ZevCommerce</span>
                        <p className="mt-2 text-sm text-text-secondary max-w-md">
                            A premium, minimalist headless storefront template powered by Next.js 15, Tailwind CSS, and the ZevCommerce Headless API.
                        </p>
                    </div>

                    {/* Links: Shop */}
                    <div>
                        <h3 className="text-sm font-semibold tracking-wider text-text-primary uppercase">Shop</h3>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <Link href="/products" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                                    All Products
                                </Link>
                            </li>
                            <li>
                                <Link href="/collections" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                                    Collections
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Links: Support */}
                    <div>
                        <h3 className="text-sm font-semibold tracking-wider text-text-primary uppercase">Support</h3>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <Link href="/faq" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="mt-12 border-t border-border-light pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-text-secondary">
                        &copy; {currentYear} ZevCommerce, Inc. All rights reserved.
                    </p>
                    <p className="text-sm text-text-secondary mt-4 md:mt-0">
                        Powered by ZevCommerce API
                    </p>
                </div>
            </div>
        </footer>
    );
}
