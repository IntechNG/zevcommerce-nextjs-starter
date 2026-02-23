'use client';

import { useState } from 'react';
import { Tag } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface DiscountCodeProps {
    onApply: (code: string) => void;
    isLoading?: boolean;
    error?: string;
    applied?: string;
}

export function DiscountCode({ onApply, isLoading, error, applied }: DiscountCodeProps) {
    const [code, setCode] = useState('');

    return (
        <div className="space-y-2">
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                    <input
                        type="text"
                        value={code}
                        onChange={e => setCode(e.target.value)}
                        placeholder="Discount code"
                        className="w-full h-10 pl-9 pr-3 rounded-md border border-border-light bg-surface text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                    />
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onApply(code)}
                    disabled={!code.trim() || isLoading}
                    isLoading={isLoading}
                    className="h-10"
                >
                    Apply
                </Button>
            </div>
            {error && <p className="text-xs text-red-600">{error}</p>}
            {applied && <p className="text-xs text-green-600">Discount &ldquo;{applied}&rdquo; applied</p>}
        </div>
    );
}
