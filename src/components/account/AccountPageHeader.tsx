'use client';

import type { ReactNode } from 'react';

interface AccountPageHeaderProps {
    title: string;
    description?: string;
    children?: ReactNode; // For actions like buttons
}

export function AccountPageHeader({ title, description, children }: AccountPageHeaderProps) {
    return (
        <div className="w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
                <h2 className="text-xl font-semibold text-text-primary">
                    {title}
                </h2>
                {description && (
                    <p className="mt-1 text-sm text-text-secondary">
                        {description}
                    </p>
                )}
            </div>
            {children && (
                <div className="shrink-0">
                    {children}
                </div>
            )}
        </div>
    );
}
