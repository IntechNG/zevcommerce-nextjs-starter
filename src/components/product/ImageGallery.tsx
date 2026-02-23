'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ImageGalleryProps {
    images: { url: string; alt: string }[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    if (images.length === 0) {
        return (
            <div className="aspect-[3/4] w-full rounded-lg bg-surface-hover flex items-center justify-center text-text-secondary">
                No images available
            </div>
        );
    }

    const selectedImage = images[selectedIndex];

    return (
        <div className="flex flex-col gap-3">
            {/* Main Image */}
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-surface-hover">
                <Image
                    src={selectedImage.url}
                    alt={selectedImage.alt || 'Product image'}
                    fill
                    className="object-cover object-center"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    priority
                />
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedIndex(index)}
                            className={cn(
                                'relative w-16 h-20 rounded-md overflow-hidden shrink-0 border-2 transition-colors',
                                index === selectedIndex ? 'border-brand' : 'border-transparent hover:border-border-light'
                            )}
                        >
                            <Image
                                src={image.url}
                                alt={image.alt || `Thumbnail ${index + 1}`}
                                fill
                                className="object-cover"
                                sizes="64px"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
