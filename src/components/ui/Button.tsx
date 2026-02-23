import * as React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
        return (
            <button
                ref={ref}
                disabled={disabled || isLoading}
                className={cn(
                    'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none',
                    {
                        'bg-brand text-white hover:bg-brand/90 focus-visible:outline-brand': variant === 'primary',
                        'bg-surface-hover text-brand hover:bg-border-light': variant === 'secondary',
                        'border border-border-light bg-transparent hover:bg-surface-hover text-brand': variant === 'outline',
                        'bg-transparent hover:bg-surface-hover text-text-secondary hover:text-brand': variant === 'ghost',
                        'h-9 px-4 text-xs': size === 'sm',
                        'h-10 px-6 text-sm': size === 'md',
                        'h-12 px-8 text-base': size === 'lg',
                    },
                    className
                )}
                {...props}
            >
                {isLoading ? (
                    <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : null}
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';
