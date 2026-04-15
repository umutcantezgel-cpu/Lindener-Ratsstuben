"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getRelatedLinks } from '@/lib/internal-links';
import { ArrowRight } from 'lucide-react';

export function RelatedContent() {
    const pathname = usePathname();
    const links = getRelatedLinks(pathname);

    if (!links || links.length === 0) return null;

    return (
        <aside className="mt-16 pt-8 border-t border-border" aria-labelledby="related-content-title">
            <h3 id="related-content-title" className="text-xl font-bold font-display text-text-main mb-6">
                Passend dazu
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {links.map((link, index) => (
                    <Link 
                        key={index} 
                        href={link.href}
                        className="group flex flex-col p-6 rounded-xl border border-border bg-bg-secondary hover:border-primary hover:shadow-sm transition-all"
                    >
                        <span className="font-semibold text-text-primary group-hover:text-primary transition-colors flex items-center gap-2">
                            {link.title}
                            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                        </span>
                        <span className="text-sm text-text-secondary mt-2">
                            {link.description}
                        </span>
                    </Link>
                ))}
            </div>
        </aside>
    );
}
