import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/api/products';
import { getAllMediaUrls } from '@/lib/utils';
import { ImageGallery } from '@/components/product/ImageGallery';
import { ProductDetailClient } from './product-detail-client';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const product = await getProductBySlug(slug);
    if (!product) return { title: 'Product Not Found' };
    return {
        title: product.title,
        description: product.description || `Shop ${product.title}`,
    };
}

export default async function ProductDetailPage({ params }: Props) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) notFound();

    const images = getAllMediaUrls(product.mediaJson);

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Image Gallery */}
                <ImageGallery images={images} />

                {/* Product Info (client component for interactivity) */}
                <ProductDetailClient product={product} />
            </div>
        </div>
    );
}
