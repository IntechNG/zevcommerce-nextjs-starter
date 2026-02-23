import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { getArticle } from '@/lib/api/content';
import { formatDate } from '@/lib/utils';
import { ROUTES } from '@/lib/constants';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const article = await getArticle(slug);
    if (!article) return { title: 'Article Not Found' };
    return { title: article.title, description: article.excerpt || undefined };
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const article = await getArticle(slug);

    if (!article) notFound();

    return (
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <Link
                href={ROUTES.BLOG}
                className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary transition-colors mb-6"
            >
                <ArrowLeft size={14} /> Back to Journal
            </Link>

            <article>
                <header className="mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary mb-3">
                        {article.title}
                    </h1>
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                        {article.author && <span>{article.author}</span>}
                        {article.author && article.publishedAt && <span>&middot;</span>}
                        {article.publishedAt && <span>{formatDate(article.publishedAt)}</span>}
                    </div>
                </header>

                {article.image && (
                    <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-surface-hover mb-8">
                        <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 768px"
                            priority
                        />
                    </div>
                )}

                {article.excerpt && (
                    <div className="prose prose-sm sm:prose-base max-w-none">
                        <p className="text-lg text-text-secondary leading-relaxed">{article.excerpt}</p>
                    </div>
                )}
            </article>
        </div>
    );
}
