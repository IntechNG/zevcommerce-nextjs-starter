'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { isDemoMode } from '@/lib/demo-mode';
import { zevClient } from '@/lib/zev-client';

/**
 * LiveTracker — Sends real-time page view events to the ZevCommerce
 * analytics service. Includes automatic 30-second heartbeats to keep
 * the visitor session alive in the dashboard Live View.
 *
 * Drop this component once in your layout and it handles everything.
 * Does nothing in demo mode.
 */
export function LiveTracker() {
    const pathname = usePathname();
    const initialised = useRef(false);

    useEffect(() => {
        if (isDemoMode()) return;

        const referrer = !initialised.current ? document.referrer || undefined : undefined;
        initialised.current = true;

        zevClient.analytics.startPageTracking(pathname, referrer);

        return () => {
            zevClient.analytics.stopHeartbeat();
        };
    }, [pathname]);

    return null;
}
