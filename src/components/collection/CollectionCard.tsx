import Link from 'next/link';

interface CollectionCardProps {
    collection: {
        id: string;
        title: string;
        slug: string;
        description: string | null;
    };
}

export function CollectionCard({ collection }: CollectionCardProps) {
    return (
        <Link href={`/collections/${collection.slug}`} className="group flex flex-col">
            <div className="relative flex aspect-[2/1] w-full items-center justify-center overflow-hidden rounded-md bg-surface-hover border border-border-light transition-colors group-hover:border-brand/20">
                <h3 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight group-hover:text-brand transition-colors z-10 px-6 text-center">
                    {collection.title}
                </h3>
                {/* Subtle hover gradient abstract to maintain minimal aesthetic */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-brand/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 mix-blend-multiply" />
            </div>
            {collection.description && (
                <div className="mt-4 flex flex-col items-start gap-1">
                    <p className="text-sm text-text-secondary line-clamp-2">
                        {collection.description}
                    </p>
                </div>
            )}
        </Link>
    );
}
