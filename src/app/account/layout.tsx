'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { AccountSidebar } from '@/components/account/AccountSidebar';
import { ROUTES } from '@/lib/constants';

export default function AccountLayout({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push(ROUTES.LOGIN);
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) return null;

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary mb-8">My Account</h1>
            <div className="flex flex-col lg:flex-row gap-8">
                <AccountSidebar />
                <div className="flex-1 min-w-0">
                    {children}
                </div>
            </div>
        </div>
    );
}
