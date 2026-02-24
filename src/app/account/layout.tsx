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
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 min-h-[68vh]" style={{ maxWidth: '1280px' }}>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary mb-8 text-center">My Account</h1>
            <div className="grid grid-cols-1 lg:grid-cols-[14rem_minmax(0,1fr)] items-start gap-8 lg:gap-12">
                <AccountSidebar />
                <div className="w-full min-w-0">
                    <div className="w-full max-w-4xl">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
