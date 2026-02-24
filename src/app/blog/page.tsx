import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen } from 'lucide-react';
import { getArticles } from '@/lib/api/content';
import { EmptyState } from '@/components/ui/EmptyState';
import { formatDate } from '@/lib/utils';
import { ROUTES } from '@/lib/constants';

export const metadata: Metadata = {
    title: 'Blog',
};

export default async function BlogPage() {
    const articles = await getArticles();

    return (
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12" style={{ maxWidth: '1440px' }}>
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">Journal</h1>
                <p className="mt-2 text-sm text-text-secondary">Style tips, guides, and inspiration.</p>
            </div>

            {articles.length === 0 ? (
                <EmptyState
                    icon={<BookOpen size={48} strokeWidth={1.5} />}
                    title="No articles yet"
                    description="Check back soon for style tips and inspiration."
                    actionLabel="Browse Products"
                    actionHref={ROUTES.PRODUCTS}
                />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map(article => (
                        <Link
                            key={article.id}
                            href={ROUTES.BLOG_ARTICLE(article.slug)}
                            className="group"
                        >
                            <article className="space-y-3">
                                {article.image && (
                                    <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-surface-hover">
                                        <Image
                                            src={article.image}
                                            alt={article.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        />
                                    </div>
                                )}
                                <div>
                                    <div className="flex items-center gap-2 text-xs text-text-secondary mb-1">
                                        {article.author && <span>{article.author}</span>}
                                        {article.author && article.publishedAt && <span>&middot;</span>}
                                        {article.publishedAt && <span>{formatDate(article.publishedAt)}</span>}
                                    </div>
                                    <h2 className="text-base font-semibold text-text-primary group-hover:text-brand transition-colors">
                                        {article.title}
                                    </h2>
                                    {article.excerpt && (
                                        <p className="text-sm text-text-secondary mt-1 line-clamp-2">
                                            {article.excerpt}
                                        </p>
                                    )}
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
