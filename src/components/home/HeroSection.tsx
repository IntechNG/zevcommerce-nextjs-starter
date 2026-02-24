import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/lib/constants';

export function HeroSection() {
    return (
        <section className="relative bg-brand text-white">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36" style={{ maxWidth: '1440px' }}>
                <div className="max-w-2xl">
                    <p className="text-xs font-medium tracking-[0.2em] uppercase text-white/60 mb-4">
                        New Season
                    </p>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
                        Essentials for the modern wardrobe
                    </h1>
                    <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-lg">
                        Thoughtfully designed, sustainably made. Discover our curated collection of everyday staples.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-4">
                        <Link href={ROUTES.PRODUCTS}>
                            <Button
                                variant="secondary"
                                size="lg"
                                className="bg-white text-brand hover:bg-white/90"
                            >
                                Shop Now
                                <ArrowRight size={18} className="ml-2" />
                            </Button>
                        </Link>
                        <Link href={ROUTES.COLLECTIONS}>
                            <Button
                                variant="outline"
                                size="lg"
                                className="border-white/30 text-white hover:bg-white/10 hover:text-white"
                            >
                                Browse Collections
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
