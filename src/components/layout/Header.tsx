'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, User, Menu } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { MobileNav } from './MobileNav';
import { ROUTES } from '@/lib/constants';

interface HeaderProps {
    storeName: string;
}

export function Header({ storeName }: HeaderProps) {
    const { itemCount, openCart } = useCart();
    const { isAuthenticated } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <>
            <header className="sticky top-0 z-40 w-full border-b border-border-light bg-surface/95 backdrop-blur-md">
                <div className="mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8" style={{ maxWidth: '1440px' }}>

                    {/* Left: Mobile menu + Logo */}
                    <div className="flex items-center gap-4">
                        <button
                            className="lg:hidden p-2 -ml-2 text-text-secondary hover:text-text-primary transition-colors"
                            onClick={() => setIsMobileMenuOpen(true)}
                            aria-label="Open menu"
                        >
                            <Menu size={22} />
                        </button>
                        <Link href="/" className="text-xl font-bold tracking-tight text-brand uppercase">
                            {storeName}
                        </Link>
                    </div>

                    {/* Center: Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-8">
                        <Link href={ROUTES.PRODUCTS} className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
                            Shop All
                        </Link>
                        <Link href={ROUTES.COLLECTIONS} className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
                            Collections
                        </Link>
                        <Link href={ROUTES.BLOG} className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
                            Journal
                        </Link>
                        <Link href={ROUTES.PAGE('about')} className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
                            About
                        </Link>
                    </nav>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="p-2.5 text-text-secondary hover:text-text-primary transition-colors"
                            aria-label="Search"
                        >
                            <Search size={20} />
                        </button>
                        <Link
                            href={isAuthenticated ? ROUTES.ACCOUNT : ROUTES.LOGIN}
                            className="p-2.5 text-text-secondary hover:text-text-primary transition-colors hidden sm:flex"
                            aria-label="Account"
                        >
                            <User size={20} />
                        </Link>
                        <button
                            onClick={openCart}
                            className="relative p-2.5 text-text-secondary hover:text-text-primary transition-colors"
                            aria-label="Cart"
                        >
                            <ShoppingBag size={20} />
                            {itemCount > 0 && (
                                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-white">
                                    {itemCount > 99 ? '99+' : itemCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Search Bar (expandable) */}
                {isSearchOpen && (
                    <div className="border-t border-border-light px-4 py-3 sm:px-6 lg:px-8">
                        <div className="mx-auto" style={{ maxWidth: '1440px' }}>
                            <form action={ROUTES.SEARCH} method="GET" className="relative">
                                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                                <input
                                    type="search"
                                    name="q"
                                    placeholder="Search products, collections, articles..."
                                    autoFocus
                                    className="w-full h-10 pl-10 pr-4 rounded-md border border-border-light bg-surface text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                                />
                            </form>
                        </div>
                    </div>
                )}
            </header>

            <MobileNav isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        </>
    );
}
