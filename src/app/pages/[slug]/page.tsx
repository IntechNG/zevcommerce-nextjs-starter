import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPage, getPages } from '@/lib/api/content';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const page = await getPage(slug);
    if (!page) return { title: 'Page Not Found' };
    return { title: page.title };
}

export default async function ContentPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const page = await getPage(slug);

    if (!page) notFound();

    return (
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary mb-8">
                {page.title}
            </h1>
            {page.content ? (
                <div
                    className="prose prose-sm sm:prose-base max-w-none"
                    dangerouslySetInnerHTML={{ __html: page.content }}
                />
            ) : (
                <p className="text-text-secondary">This page has no content yet.</p>
            )}
        </div>
    );
}
