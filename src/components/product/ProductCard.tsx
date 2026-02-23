import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@zevop/commerce-storefront';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const defaultVariant = product.variants?.[0];
    const price = defaultVariant?.price ?? 0;

    // Minimalist standard placeholder if no media exists
    const imageUrl = product.mediaJson?.[0]?.url || 'https://via.placeholder.com/400x500?text=No+Image';

    return (
        <Link href={`/products/${product.slug}`} className="group flex flex-col">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md bg-surface-hover">
                <Image
                    src={imageUrl}
                    alt={product.title}
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                />
            </div>
            <div className="mt-4 flex flex-col items-start gap-1">
                <h3 className="text-sm font-medium text-text-primary group-hover:underline decoration-1 underline-offset-2">
                    {product.title}
                </h3>
                <p className="text-sm font-semibold text-brand">
                    {formatPrice(price)}
                </p>
            </div>
        </Link>
    );
}
