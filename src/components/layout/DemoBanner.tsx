'use client';

import { useState } from 'react';
import { X, Zap } from 'lucide-react';
import { isDemoMode } from '@/lib/demo-mode';

export function DemoBanner() {
    const [dismissed, setDismissed] = useState(false);

    if (!isDemoMode() || dismissed) return null;

    return (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2.5">
            <div className="mx-auto flex items-center justify-between gap-4" style={{ maxWidth: '1440px' }}>
                <div className="flex items-center gap-2 text-sm text-amber-800">
                    <Zap size={14} className="shrink-0" />
                    <span>
                        <strong>Demo Mode</strong> — You&apos;re viewing sample data.{' '}
                        <a
                            href="https://github.com/IntechNG/zevcommerce-nextjs-starter#getting-started"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline underline-offset-2 font-medium hover:text-amber-900"
                        >
                            Connect your store to go live
                        </a>
                    </span>
                </div>
                <button
                    onClick={() => setDismissed(true)}
                    className="text-amber-600 hover:text-amber-800 transition-colors shrink-0"
                    aria-label="Dismiss demo banner"
                >
                    <X size={16} />
                </button>
            </div>
        </div>
    );
}
