import { Truck, Shield, RotateCcw, Headphones } from 'lucide-react';

const props = [
    { icon: Truck, title: 'Free Shipping', description: 'On orders over ₦50,000' },
    { icon: Shield, title: 'Secure Payment', description: 'Your data is protected' },
    { icon: RotateCcw, title: 'Easy Returns', description: '14-day return policy' },
    { icon: Headphones, title: 'Support', description: 'Dedicated customer care' },
];

export function ValueProps() {
    return (
        <section className="border-y border-border-light">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8" style={{ maxWidth: '1440px' }}>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {props.map(({ icon: Icon, title, description }) => (
                        <div key={title} className="flex items-start gap-3">
                            <div className="shrink-0 p-2 rounded-lg bg-surface-hover">
                                <Icon size={20} className="text-brand" strokeWidth={1.5} />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
                                <p className="text-xs text-text-secondary mt-0.5">{description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
