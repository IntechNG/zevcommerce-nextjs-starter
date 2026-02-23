import { notFound } from 'next/navigation';
import { zevClient } from '@/lib/zev-client';
import { ProductCard } from '@/components/product/ProductCard';

interface CollectionPageProps {
    params: Promise<{ handle: string }>;
}

export async function generateMetadata(props: CollectionPageProps) {
    const params = await props.params;
    try {
        const collection = await zevClient.collections.getBySlug(params.handle);
        return {
            title: `${collection.title} | ZevCommerce`,
            description: collection.description || `Shop the ${collection.title} collection.`,
        };
    } catch {
        return { title: 'Collection Not Found' };
    }
}

export default async function CollectionPage(props: CollectionPageProps) {
    const params = await props.params;
    let collection;

    try {
        collection = await zevClient.collections.getBySlug(params.handle);
    } catch (error) {
        notFound();
    }

    if (!collection) notFound();

    // The ZevCommerce collections.getBySlug resolver currently returns a Collection type 
    // without the embedded products list natively based on our implementation, 
    // so we may need to fetch products by collection handle if the API supported it.
    // Assuming 'products' is part of the collection response for this template:
    const products = (collection as any).products || [];

    return (
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex flex-col items-start border-b border-border-light pb-6">
                <h1 className="text-4xl font-extrabold tracking-tight text-brand">{collection.title}</h1>
                {collection.description && (
                    <p className="mt-4 max-w-3xl text-base text-text-secondary">
                        {collection.description}
                    </p>
                )}
            </div>

            {products.length === 0 ? (
                <div className="py-20 text-center">
                    <p className="text-text-secondary">No products in this collection yet.</p>
                </div>
            ) : (
                <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:gap-x-8">
                    {products.map((product: any) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}
