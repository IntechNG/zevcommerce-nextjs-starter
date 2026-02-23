import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CheckoutStepsProps {
    currentStep: number;
    steps: string[];
}

export function CheckoutSteps({ currentStep, steps }: CheckoutStepsProps) {
    return (
        <div className="flex items-center gap-2 mb-8">
            {steps.map((step, index) => (
                <div key={step} className="flex items-center gap-2">
                    <div className={cn(
                        'flex items-center justify-center w-7 h-7 rounded-full text-xs font-medium shrink-0',
                        index < currentStep
                            ? 'bg-green-600 text-white'
                            : index === currentStep
                                ? 'bg-brand text-white'
                                : 'bg-surface-hover text-text-secondary border border-border-light'
                    )}>
                        {index < currentStep ? <Check size={14} /> : index + 1}
                    </div>
                    <span className={cn(
                        'text-sm font-medium hidden sm:inline',
                        index === currentStep ? 'text-text-primary' : 'text-text-secondary'
                    )}>
                        {step}
                    </span>
                    {index < steps.length - 1 && (
                        <div className={cn(
                            'w-8 sm:w-12 h-px',
                            index < currentStep ? 'bg-green-600' : 'bg-border-light'
                        )} />
                    )}
                </div>
            ))}
        </div>
    );
}
