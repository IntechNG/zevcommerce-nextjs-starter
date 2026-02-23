import { getFeaturedProducts } from '@/lib/api/products';
import { getCollections } from '@/lib/api/collections';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { FeaturedCollections } from '@/components/home/FeaturedCollections';
import { ValueProps } from '@/components/home/ValueProps';

export default async function HomePage() {
    const [products, collections] = await Promise.all([
        getFeaturedProducts(8),
        getCollections(),
    ]);

    return (
        <>
            <HeroSection />
            <ValueProps />
            <FeaturedProducts products={products} />
            <FeaturedCollections collections={collections} />
        </>
    );
}
