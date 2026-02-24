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
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12" style={{ maxWidth: '1440px' }}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                {/* Image Gallery */}
                <div className="lg:col-span-7">
                    <ImageGallery images={images} />
                </div>

                {/* Product Info (client component for interactivity) */}
                <div className="lg:col-span-5">
                    <ProductDetailClient product={product} />
                </div>
            </div>
        </div>
    );
}
