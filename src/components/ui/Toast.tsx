'use client';

import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useToast, type Toast as ToastType } from '@/contexts/ToastContext';
import { cn } from '@/lib/utils';

const icons = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
};

const styles = {
    success: 'bg-green-50 text-green-800 border-green-200',
    error: 'bg-red-50 text-red-800 border-red-200',
    info: 'bg-blue-50 text-blue-800 border-blue-200',
};

function ToastItem({ toast }: { toast: ToastType }) {
    const { removeToast } = useToast();
    const Icon = icons[toast.type];

    return (
        <div className={cn(
            'flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg animate-slide-up',
            styles[toast.type]
        )}>
            <Icon size={18} className="shrink-0" />
            <p className="text-sm font-medium flex-1">{toast.message}</p>
            <button onClick={() => removeToast(toast.id)} className="shrink-0 opacity-60 hover:opacity-100 transition-opacity">
                <X size={16} />
            </button>
        </div>
    );
}

export function ToastContainer() {
    const { toasts } = useToast();

    if (toasts.length === 0) return null;

    return (
        <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
            {toasts.map(toast => (
                <div key={toast.id} className="pointer-events-auto">
                    <ToastItem toast={toast} />
                </div>
            ))}
        </div>
    );
}
