import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import Script from 'next/script';

export interface BreadcrumbItem {
    label: string;
    href: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
    className?: string;
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://dirk.respira.cafe/',
            },
            ...items.map((item, index) => ({
                '@type': 'ListItem',
                position: index + 2,
                name: item.label,
                item: `https://dirk.respira.cafe${item.href}`,
            })),
        ],
    };

    return (
        <>
            <Script
                id={`breadcrumbs-${items[items.length - 1]?.label.replace(/\s+/g, '-').toLowerCase()}`}
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <nav aria-label="Breadcrumb" className={`flex items-center gap-2 font-sans text-[12px] font-semibold tracking-widest uppercase ${className}`}>
                <ol className="flex items-center gap-2">
                    <li>
                        <Link href="/" className="hover:text-[#C96A45] transition-colors">
                            Home
                        </Link>
                    </li>
                    {items.map((item, index) => {
                        const isLast = index === items.length - 1;
                        return (
                            <li key={item.href} className="flex items-center gap-2">
                                <ChevronRight className="w-3 h-3 opacity-40" />
                                {isLast ? (
                                    <span className="text-[#C96A45] truncate max-w-[200px] md:max-w-none line-clamp-1" aria-current="page">
                                        {item.label}
                                    </span>
                                ) : (
                                    <Link href={item.href} className="hover:text-[#C96A45] transition-colors truncate max-w-[150px] md:max-w-none">
                                        {item.label}
                                    </Link>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </nav>
        </>
    );
}
