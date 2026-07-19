"use client";

import React, { useRef } from 'react';
import { Testimonial } from '@/data/testimonials';
import { TestimonialCard } from '@/components/cards/TestimonialCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ReviewCarouselProps {
    testimonials: Testimonial[];
}

export function ReviewCarousel({ testimonials }: ReviewCarouselProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const scrollAmount = container.clientWidth * 0.8; // Scroll by 80% of container width
            
            container.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    if (!testimonials || testimonials.length === 0) return null;

    return (
        <div className="relative w-full max-w-6xl mx-auto group">
            {/* Carousel Container */}
            <div 
                ref={scrollContainerRef}
                className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 pt-4 px-4 hide-scrollbar scroll-smooth"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {testimonials.map((testimonial) => (
                    <div 
                        key={testimonial.id as unknown as string}
                        className="snap-center shrink-0 w-[85vw] sm:w-[350px]"
                    >
                        <TestimonialCard testimonial={testimonial} />
                    </div>
                ))}
            </div>

            {/* Navigation Buttons (Desktop mostly) */}
            <button 
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-6 z-10 p-2 rounded-full bg-bg-primary text-text-primary shadow-lg border border-border-color opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 hidden sm:flex items-center justify-center hover:bg-bg-secondary"
                aria-label="Vorherige Bewertungen"
            >
                <ChevronLeft size={24} />
            </button>

            <button 
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-6 z-10 p-2 rounded-full bg-bg-primary text-text-primary shadow-lg border border-border-color opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 hidden sm:flex items-center justify-center hover:bg-bg-secondary"
                aria-label="Weitere Bewertungen"
            >
                <ChevronRight size={24} />
            </button>
            
            {/* Hide scrollbar styles using CSS injection for webkit browsers */}
            <style jsx>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
}
