import Link from 'next/link';
import { ROUTES } from '@/lib/constants';

interface FooterProps {
    storeName?: string;
}

export default function Footer({ storeName = 'ATELIER' }: FooterProps) {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-border-light bg-surface">
            <div className="mx-auto px-4 py-12 sm:px-6 lg:px-8" style={{ maxWidth: '1440px' }}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <span className="text-lg font-bold text-brand uppercase tracking-tight">{storeName}</span>
                        <p className="mt-3 text-sm text-text-secondary leading-relaxed max-w-xs">
                            Curated essentials for the modern wardrobe. Quality craftsmanship, thoughtful design.
                        </p>
                    </div>

                    {/* Shop */}
                    <div>
                        <h3 className="text-xs font-semibold tracking-wider text-text-primary uppercase mb-4">Shop</h3>
                        <ul className="space-y-2.5">
                            <li>
                                <Link href={ROUTES.PRODUCTS} className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                                    All Products
                                </Link>
                            </li>
                            <li>
                                <Link href={ROUTES.COLLECTIONS} className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                                    Collections
                                </Link>
                            </li>
                            <li>
                                <Link href="/collections/new-arrivals" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                                    New Arrivals
                                </Link>
                            </li>
                            <li>
                                <Link href="/collections/sale" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                                    Sale
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Help */}
                    <div>
                        <h3 className="text-xs font-semibold tracking-wider text-text-primary uppercase mb-4">Help</h3>
                        <ul className="space-y-2.5">
                            <li>
                                <Link href={ROUTES.PAGE('shipping-returns')} className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                                    Shipping & Returns
                                </Link>
                            </li>
                            <li>
                                <Link href={ROUTES.PAGE('faq')} className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link href={ROUTES.LOGIN} className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                                    My Account
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-xs font-semibold tracking-wider text-text-primary uppercase mb-4">Company</h3>
                        <ul className="space-y-2.5">
                            <li>
                                <Link href={ROUTES.PAGE('about')} className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href={ROUTES.BLOG} className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                                    Journal
                                </Link>
                            </li>
                            <li>
                                <Link href={ROUTES.PAGE('terms')} className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="mt-12 border-t border-border-light pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-text-secondary">
                        &copy; {currentYear} {storeName}. All rights reserved.
                    </p>
                    <p className="text-xs text-text-secondary">
                        Powered by{' '}
                        <a
                            href="https://zevcommerce.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium hover:text-text-primary transition-colors"
                        >
                            ZevCommerce
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
