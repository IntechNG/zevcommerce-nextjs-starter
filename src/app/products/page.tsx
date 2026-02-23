import { zevClient } from '@/lib/zev-client';
import { ProductCard } from '@/components/product/ProductCard';

export const dynamic = 'force-dynamic';

export const metadata = {
    title: 'All Products | ZevCommerce',
    description: 'Shop our latest catalog of premium products.',
};

export default async function ProductsPage() {
    const productsResult = await zevClient.products.list({ limit: 20 });
    const products = productsResult.data || [];

    return (
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between border-b border-border-light pb-6">
                <h1 className="text-3xl font-bold tracking-tight text-brand">All Products</h1>
                <p className="text-sm text-text-secondary">{products.length} items</p>
            </div>

            {products.length === 0 ? (
                <div className="py-20 text-center">
                    <p className="text-text-secondary">No products found.</p>
                </div>
            ) : (
                <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:gap-x-8">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}
