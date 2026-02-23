import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border-light bg-surface/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* Logo */}
                <div className="flex flex-1 items-center">
                    <Link href="/" className="text-xl font-bold tracking-tight text-brand">
                        ZevCommerce
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex gap-6">
                    <Link href="/products" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
                        All Products
                    </Link>
                    <Link href="/collections" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
                        Collections
                    </Link>
                    <Link href="/about" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
                        About
                    </Link>
                </div>

                {/* Right Actions (Cart) */}
                <div className="flex flex-1 items-center justify-end">
                    <button
                        type="button"
                        className="group relative p-2"
                        aria-label="Toggle cart"
                    >
                        <ShoppingCart className="h-5 w-5 text-text-secondary group-hover:text-text-primary transition-colors" />

                        {/* Cart Badge Placeholder */}
                        {/* <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-white">3</span> */}
                    </button>
                </div>

            </div>
        </nav>
    );
}
