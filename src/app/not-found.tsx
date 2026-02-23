import Link from 'next/link';
import { Home, ShoppingBag, Layers } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
    return (
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-20">
            <p className="text-8xl font-bold text-brand/10 mb-2">404</p>
            <h1 className="text-2xl font-bold text-text-primary mb-3">Page not found</h1>
            <p className="text-text-secondary text-center max-w-md mb-8">
                Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
                <Link href="/">
                    <Button variant="primary" size="md">
                        <Home size={16} className="mr-2" />
                        Go Home
                    </Button>
                </Link>
                <Link href="/products">
                    <Button variant="outline" size="md">
                        <ShoppingBag size={16} className="mr-2" />
                        Shop Products
                    </Button>
                </Link>
                <Link href="/collections">
                    <Button variant="outline" size="md">
                        <Layers size={16} className="mr-2" />
                        Collections
                    </Button>
                </Link>
            </div>
        </div>
    );
}
