import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCollectionBySlug, getCollectionProducts } from '@/lib/api/collections';
import { ProductGrid } from '@/components/product/ProductGrid';

interface Props {
    params: Promise<{ handle: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { handle } = await params;
    const collection = await getCollectionBySlug(handle);
    if (!collection) return { title: 'Collection Not Found' };
    return {
        title: collection.title,
        description: collection.description || `Shop the ${collection.title} collection`,
    };
}

export default async function CollectionDetailPage({ params }: Props) {
    const { handle } = await params;
    const [collection, products] = await Promise.all([
        getCollectionBySlug(handle),
        getCollectionProducts(handle),
    ]);

    if (!collection) notFound();

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
                    {collection.title}
                </h1>
                {collection.description && (
                    <p className="mt-2 text-sm text-text-secondary max-w-2xl">{collection.description}</p>
                )}
                <p className="mt-1 text-xs text-text-muted">{collection.productCount} products</p>
            </div>

            <ProductGrid
                products={products}
                emptyTitle="No products in this collection"
                emptyDescription="This collection is empty right now. Check back soon for new additions."
            />
        </div>
    );
}
