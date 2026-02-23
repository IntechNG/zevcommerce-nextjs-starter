'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    baseUrl: string;
}

export function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    // Show max 5 page numbers with ellipsis
    const getVisiblePages = () => {
        if (totalPages <= 5) return pages;
        if (currentPage <= 3) return [...pages.slice(0, 4), -1, totalPages];
        if (currentPage >= totalPages - 2) return [1, -1, ...pages.slice(totalPages - 4)];
        return [1, -1, currentPage - 1, currentPage, currentPage + 1, -1, totalPages];
    };

    const href = (page: number) => `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}page=${page}`;

    return (
        <nav className="flex items-center justify-center gap-1 mt-8">
            {currentPage > 1 && (
                <Link href={href(currentPage - 1)} className="p-2 text-text-secondary hover:text-text-primary transition-colors">
                    <ChevronLeft size={18} />
                </Link>
            )}
            {getVisiblePages().map((page, idx) =>
                page === -1 ? (
                    <span key={`ellipsis-${idx}`} className="px-2 text-text-secondary">...</span>
                ) : (
                    <Link
                        key={page}
                        href={href(page)}
                        className={cn(
                            'flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors',
                            page === currentPage
                                ? 'bg-brand text-white'
                                : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'
                        )}
                    >
                        {page}
                    </Link>
                )
            )}
            {currentPage < totalPages && (
                <Link href={href(currentPage + 1)} className="p-2 text-text-secondary hover:text-text-primary transition-colors">
                    <ChevronRight size={18} />
                </Link>
            )}
        </nav>
    );
}
