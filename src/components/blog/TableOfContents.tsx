"use client";

import React, { useEffect, useState } from 'react';

interface TOCItem {
    id: string;
    text: string;
    level: number;
}

export function TableOfContents() {
    const [headings, setHeadings] = useState<TOCItem[]>([]);
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        // Find all headings inside main-content
        const elements = Array.from(document.querySelectorAll('main h2, main h3'))
            .filter(element => element.id);
            
        const headingData: TOCItem[] = elements.map(element => ({
            id: element.id,
            text: element.textContent || "",
            level: Number(element.tagName.replace('H', ''))
        }));
        
        setHeadings(headingData);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '0% 0% -80% 0%' }
        );

        elements.forEach((elem) => observer.observe(elem));

        return () => observer.disconnect();
    }, []);

    if (headings.length === 0) return null;

    return (
        <nav aria-label="Inhaltsverzeichnis" className="sticky top-24 p-6 bg-bg-secondary rounded-xl border border-border">
            <h4 className="font-display font-bold text-text-main mb-4 uppercase tracking-wider text-sm">
                Auf dieser Seite
            </h4>
            <ul className="space-y-2">
                {headings.map((heading) => (
                    <li 
                        key={heading.id} 
                        style={{ paddingLeft: `${(heading.level - 2) * 1}rem` }}
                    >
                        <a 
                            href={`#${heading.id}`}
                            className={`text-sm transition-colors ${
                                activeId === heading.id 
                                    ? 'text-primary font-semibold' 
                                    : 'text-text-secondary hover:text-text-primary'
                            }`}
                        >
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
