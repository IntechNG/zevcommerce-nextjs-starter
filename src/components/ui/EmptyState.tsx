import Link from 'next/link';
import { PackageOpen } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
    icon?: React.ReactNode;
    title: string;
    description: string;
    actionLabel?: string;
    actionHref?: string;
    onAction?: () => void;
}

export function EmptyState({ icon, title, description, actionLabel, actionHref, onAction }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="text-text-secondary mb-4">
                {icon || <PackageOpen size={48} strokeWidth={1.5} />}
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">{title}</h3>
            <p className="text-sm text-text-secondary max-w-md mb-6">{description}</p>
            {actionLabel && actionHref && (
                <Link href={actionHref}>
                    <Button variant="primary">{actionLabel}</Button>
                </Link>
            )}
            {actionLabel && onAction && !actionHref && (
                <Button variant="primary" onClick={onAction}>{actionLabel}</Button>
            )}
        </div>
    );
}
