"use client";

import React, { useState } from 'react';
import Image from '@/components/ui/ImagePlaceholder';
import { PageTransition } from '@/components/effects/PageTransition';
import { X, ZoomIn } from 'lucide-react';
import { useFocusManagement } from '@/hooks/useFocusManagement';
import { useTranslation } from '@/lib/i18n/use-translation';

export const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState<{ src: string; category: string } | null>(null);
    const { containerRef } = useFocusManagement(!!selectedImage, () => setSelectedImage(null));
    const { t } = useTranslation('pages');

    const images = [
        { src: '/images/placeholder.svg', category: 'Ambiente' },
        { src: '/images/placeholder.svg', category: 'Gerichte' },
        { src: '/images/placeholder.svg', category: 'Gerichte' },
        { src: '/images/placeholder.svg', category: 'Ambiente' },
        { src: '/images/placeholder.svg', category: 'Gerichte' },
        { src: '/images/placeholder.svg', category: 'Gerichte' },
        { src: '/images/placeholder.svg', category: 'Gerichte' },
        { src: '/images/placeholder.svg', category: 'Ambiente' },
        { src: '/images/placeholder.svg', category: 'Gerichte' },
    ];

    return (
        <PageTransition>
            
            <article className="pt-24 pb-20 min-h-screen bg-bg-beige" itemProp="mainContentOfPage">
                <div className="container mx-auto px-4">
                    <header className="text-center mb-12">
                        <h1 className="text-3xl md:text-4xl font-display font-bold text-white bg-brand-header px-8 py-5 rounded-2xl uppercase tracking-widest mb-4 shadow-warm inline-block w-full max-w-3xl">{t('gallery.title') as string}</h1>
                        <p className="text-text-secondary max-w-2xl mx-auto">
                            {t('gallery.description') as string}
                        </p>
                    </header>

                    {/* Masonry Grid */}
                    <ul className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 m-0 p-0 list-none">
                        {images.map((img, index) => (
                            <li
                                key={index}
                                className="break-inside-avoid relative group rounded-xl overflow-hidden shadow-sm hover:shadow-sm transition-all"
                            >
                                <button 
                                    onClick={() => setSelectedImage(img)}
                                    aria-label={`${t('gallery.zoom') as string}: ${img.category}`}
                                    className="relative w-full h-64 text-start cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-primary block"
                                >
                                    <Image
                                        src={img.src}
                                        alt={`${t('gallery.image') as string}: ${img.category}`}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100" aria-hidden="true">
                                        <ZoomIn className="text-white w-10 h-10" />
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true">
                                        <span className="text-white font-medium">{img.category}</span>
                                    </div>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Lightbox Modal */}
                {selectedImage && (
                    <div
                        ref={containerRef}
                        className="fixed inset-0 z-modal bg-black/95 flex items-center justify-center p-4 animate-in fade-in duration-300"
                        role="dialog"
                        aria-modal="true"
                        aria-label={t('gallery.preview') as string}
                    >
                        <button
                            className="absolute top-6 right-6 text-white hover:text-primary transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-primary"
                            onClick={() => setSelectedImage(null)}
                            aria-label={t('gallery.close') as string}
                        >
                            <X className="w-10 h-10" aria-hidden="true" />
                        </button>
                        <div className="relative w-full max-w-4xl h-[80vh]">
                            <Image
                                src={selectedImage.src}
                                alt={`${t('gallery.enlarged') as string}: ${selectedImage.category}`}
                                fill
                                className="object-contain rounded-lg shadow-warm"
                            />
                        </div>
                    </div>
                )}
            </article>
        </PageTransition>
    );
};

export default Gallery;
