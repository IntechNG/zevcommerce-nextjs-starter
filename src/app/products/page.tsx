import type { Metadata } from 'next';
import { getProducts } from '@/lib/api/products';
import { ProductGrid } from '@/components/product/ProductGrid';
import { Pagination } from '@/components/ui/Pagination';
import { DEFAULT_PAGE_SIZE } from '@/lib/constants';

export const metadata: Metadata = {
    title: 'All Products',
    description: 'Browse our complete collection of products.',
};

export default async function ProductsPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>;
}) {
    const params = await searchParams;
    const page = Number(params.page) || 1;
    const { data: products, meta } = await getProducts({ page, limit: DEFAULT_PAGE_SIZE });

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">All Products</h1>
                <p className="mt-2 text-sm text-text-secondary">{meta.total} products</p>
            </div>

            <ProductGrid products={products} />

            <Pagination
                currentPage={meta.page}
                totalPages={meta.totalPages}
                baseUrl="/products"
            />
        </div>
    );
}
