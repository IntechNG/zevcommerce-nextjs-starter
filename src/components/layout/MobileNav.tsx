'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { X, User, ShoppingBag, BookOpen, Info, Layers, Package } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ROUTES } from '@/lib/constants';

interface MobileNavProps {
    isOpen: boolean;
    onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
    const { isAuthenticated, logout } = useAuth();

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/50" onClick={onClose} />

            {/* Drawer */}
            <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-surface shadow-xl flex flex-col animate-slide-in-left">
                {/* Header */}
                <div className="flex items-center justify-between px-4 h-16 border-b border-border-light">
                    <span className="text-lg font-bold text-brand uppercase">Menu</span>
                    <button onClick={onClose} className="p-2 text-text-secondary hover:text-text-primary">
                        <X size={22} />
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 overflow-y-auto py-4">
                    <div className="space-y-1 px-3">
                        <NavLink href={ROUTES.PRODUCTS} icon={<Package size={18} />} onClick={onClose}>
                            Shop All
                        </NavLink>
                        <NavLink href={ROUTES.COLLECTIONS} icon={<Layers size={18} />} onClick={onClose}>
                            Collections
                        </NavLink>
                        <NavLink href={ROUTES.BLOG} icon={<BookOpen size={18} />} onClick={onClose}>
                            Journal
                        </NavLink>
                        <NavLink href={ROUTES.PAGE('about')} icon={<Info size={18} />} onClick={onClose}>
                            About
                        </NavLink>
                    </div>

                    <hr className="my-4 border-border-light mx-3" />

                    <div className="space-y-1 px-3">
                        {isAuthenticated ? (
                            <>
                                <NavLink href={ROUTES.ACCOUNT} icon={<User size={18} />} onClick={onClose}>
                                    My Account
                                </NavLink>
                                <NavLink href={ROUTES.ACCOUNT_ORDERS} icon={<ShoppingBag size={18} />} onClick={onClose}>
                                    Orders
                                </NavLink>
                                <button
                                    onClick={() => { logout(); onClose(); }}
                                    className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                >
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <>
                                <NavLink href={ROUTES.LOGIN} icon={<User size={18} />} onClick={onClose}>
                                    Sign In
                                </NavLink>
                                <NavLink href={ROUTES.REGISTER} icon={<User size={18} />} onClick={onClose}>
                                    Create Account
                                </NavLink>
                            </>
                        )}
                    </div>
                </nav>
            </div>
        </div>
    );
}

function NavLink({ href, icon, children, onClick }: {
    href: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    onClick: () => void;
}) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-text-primary hover:bg-surface-hover rounded-md transition-colors"
        >
            <span className="text-text-secondary">{icon}</span>
            {children}
        </Link>
    );
}
