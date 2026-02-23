import type { Metadata } from 'next';
import { getCollections } from '@/lib/api/collections';
import { CollectionGrid } from '@/components/collection/CollectionGrid';

export const metadata: Metadata = {
    title: 'Collections',
    description: 'Browse our curated collections.',
};

export default async function CollectionsPage() {
    const collections = await getCollections();

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">Collections</h1>
                <p className="mt-2 text-sm text-text-secondary">Browse our curated edits</p>
            </div>

            <CollectionGrid collections={collections} />
        </div>
    );
}
