'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, ShoppingBag, MapPin, Shield, LayoutDashboard } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/lib/constants';

const links = [
    { href: ROUTES.ACCOUNT, label: 'Overview', icon: LayoutDashboard },
    { href: ROUTES.ACCOUNT_ORDERS, label: 'Orders', icon: ShoppingBag },
    { href: ROUTES.ACCOUNT_ADDRESSES, label: 'Addresses', icon: MapPin },
    { href: ROUTES.ACCOUNT_PROFILE, label: 'Profile', icon: User },
    { href: ROUTES.ACCOUNT_SECURITY, label: 'Security', icon: Shield },
];

export function AccountSidebar() {
    const pathname = usePathname();

    return (
        <>
            {/* Desktop sidebar */}
            <nav className="hidden lg:block w-56 shrink-0">
                <ul className="space-y-1">
                    {links.map(({ href, label, icon: Icon }) => {
                        const isActive = pathname === href || (href !== ROUTES.ACCOUNT && pathname.startsWith(href));
                        return (
                            <li key={href}>
                                <Link
                                    href={href}
                                    className={cn(
                                        'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                                        isActive
                                            ? 'bg-brand text-white'
                                            : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                                    )}
                                >
                                    <Icon size={16} />
                                    {label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Mobile horizontal tabs */}
            <nav className="lg:hidden overflow-x-auto -mx-4 px-4 mb-6">
                <div className="flex gap-1 min-w-max">
                    {links.map(({ href, label, icon: Icon }) => {
                        const isActive = pathname === href || (href !== ROUTES.ACCOUNT && pathname.startsWith(href));
                        return (
                            <Link
                                key={href}
                                href={href}
                                className={cn(
                                    'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors',
                                    isActive
                                        ? 'bg-brand text-white'
                                        : 'text-text-secondary hover:text-text-primary bg-surface-hover'
                                )}
                            >
                                <Icon size={14} />
                                {label}
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </>
    );
}
