'use client';

import Link from 'next/link';
import { ShoppingBag, MapPin, User, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ROUTES } from '@/lib/constants';

export default function AccountOverviewPage() {
    const { customer } = useAuth();

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-xl font-semibold text-text-primary mb-1">
                    Welcome back, {customer?.firstName || 'there'}!
                </h2>
                <p className="text-sm text-text-secondary">{customer?.email}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <QuickLink
                    href={ROUTES.ACCOUNT_ORDERS}
                    icon={<ShoppingBag size={20} />}
                    title="Orders"
                    description="View your order history"
                />
                <QuickLink
                    href={ROUTES.ACCOUNT_ADDRESSES}
                    icon={<MapPin size={20} />}
                    title="Addresses"
                    description="Manage saved addresses"
                />
                <QuickLink
                    href={ROUTES.ACCOUNT_PROFILE}
                    icon={<User size={20} />}
                    title="Profile"
                    description="Update your information"
                />
            </div>
        </div>
    );
}

function QuickLink({ href, icon, title, description }: {
    href: string; icon: React.ReactNode; title: string; description: string;
}) {
    return (
        <Link
            href={href}
            className="flex items-start gap-4 p-4 rounded-lg border border-border-light hover:border-brand/20 hover:bg-surface-hover transition-colors group"
        >
            <div className="text-text-secondary">{icon}</div>
            <div className="flex-1">
                <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
                <p className="text-xs text-text-secondary mt-0.5">{description}</p>
            </div>
            <ArrowRight size={14} className="text-text-secondary group-hover:text-text-primary transition-colors mt-0.5" />
        </Link>
    );
}
