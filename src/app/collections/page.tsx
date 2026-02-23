import { zevClient } from '@/lib/zev-client';
import { CollectionCard } from '@/components/collection/CollectionCard';

export const dynamic = 'force-dynamic';

export const metadata = {
    title: 'Collections | ZevCommerce',
    description: 'Browse curated product collections.',
};

export default async function CollectionsPage() {
    const collections = await zevClient.collections.list();

    return (
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between border-b border-border-light pb-6">
                <h1 className="text-3xl font-bold tracking-tight text-brand">Collections</h1>
            </div>

            {collections.length === 0 ? (
                <div className="py-20 text-center">
                    <p className="text-text-secondary">No collections found.</p>
                </div>
            ) : (
                <div className="mt-12 grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 lg:gap-x-8">
                    {collections.map((collection) => (
                        <CollectionCard key={collection.id} collection={collection} />
                    ))}
                </div>
            )}
        </div>
    );
}
