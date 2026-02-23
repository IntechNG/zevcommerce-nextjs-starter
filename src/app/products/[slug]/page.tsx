import Image from 'next/image';
import { notFound } from 'next/navigation';
import { zevClient } from '@/lib/zev-client';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface ProductPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata(props: ProductPageProps) {
    const params = await props.params;
    try {
        const product = await zevClient.products.getBySlug(params.slug);
        return {
            title: `${product.title} | ZevCommerce`,
            description: product.description || `Buy ${product.title} on ZevCommerce`,
        };
    } catch {
        return { title: 'Product Not Found' };
    }
}

export default async function ProductPage(props: ProductPageProps) {
    const params = await props.params;
    let product;

    try {
        product = await zevClient.products.getBySlug(params.slug);
    } catch (error) {
        notFound();
    }

    if (!product) notFound();

    const defaultVariant = product.variants?.[0];
    const price = defaultVariant?.price ?? 0;

    // Minimalist standard placeholder if no media exists
    const imageUrl = product.mediaJson?.[0]?.url || 'https://via.placeholder.com/800x1000?text=No+Image';

    return (
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">

                {/* Product Media */}
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md bg-surface-hover">
                    <Image
                        src={imageUrl}
                        alt={product.title}
                        fill
                        className="object-cover object-center"
                        priority
                        sizes="(min-width: 1024px) 50vw, 100vw"
                    />
                </div>

                {/* Product Details */}
                <div className="flex flex-col pt-8 md:pt-0">
                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-brand">
                        {product.title}
                    </h1>
                    <div className="mt-4 flex items-center justify-between">
                        <p className="text-2xl font-bold text-brand">
                            {formatPrice(price)}
                        </p>
                    </div>

                    <div className="mt-8">
                        <h3 className="sr-only">Description</h3>
                        <div
                            className="prose prose-sm sm:prose-base prose-neutral text-text-secondary w-full max-w-none"
                            dangerouslySetInnerHTML={{ __html: product.description || 'No description available.' }}
                        />
                    </div>

                    <form className="mt-12">
                        <div className="flex flex-col gap-4">
                            <Button type="button" size="lg" className="w-full">
                                Add to Cart
                            </Button>
                        </div>
                    </form>

                    {/* Minimalist details breakdown */}
                    <div className="mt-12 border-t border-border-light pt-8">
                        <div className="text-sm font-medium text-text-secondary flex flex-col gap-2">
                            <div className="flex justify-between border-b border-border-light pb-2">
                                <span>SKU</span>
                                <span className="text-brand">{defaultVariant?.sku || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between border-b border-border-light py-2">
                                <span>Shipping</span>
                                <span className="text-brand">Calculated at checkout</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
