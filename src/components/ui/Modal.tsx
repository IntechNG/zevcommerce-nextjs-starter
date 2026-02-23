'use client';

import { useEffect, useCallback, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    title?: string;
    className?: string;
}

export function Modal({ isOpen, onClose, children, title, className }: ModalProps) {
    const handleEscape = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [isOpen, handleEscape]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            <div className={cn(
                'relative z-10 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto rounded-xl bg-surface shadow-xl',
                className
            )}>
                {title && (
                    <div className="flex items-center justify-between px-6 py-4 border-b border-border-light">
                        <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
                        <button onClick={onClose} className="p-1 text-text-secondary hover:text-text-primary transition-colors">
                            <X size={20} />
                        </button>
                    </div>
                )}
                {!title && (
                    <button onClick={onClose} className="absolute top-4 right-4 p-1 text-text-secondary hover:text-text-primary transition-colors z-10">
                        <X size={20} />
                    </button>
                )}
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
}
