"use client";
import React from 'react';
import { useAdaptiveMessaging } from '@/hooks/useAdaptiveMessaging';
import { getTestimonialsBySegment } from '@/data/testimonials';
import { StaggerContainer } from '@/components/animations/stagger-container';
import dynamic from 'next/dynamic';

const TestimonialCard = dynamic(() => import('@/components/cards/TestimonialCard').then(mod => mod.TestimonialCard));

export function ClientTestimonials() {
    const { heroVariant } = useAdaptiveMessaging();
    const testimonials = getTestimonialsBySegment(heroVariant || 'general');

    return (
        <StaggerContainer as="div" className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
                <div key={t.id}>
                    <TestimonialCard testimonial={t} />
                </div>
            ))}
        </StaggerContainer>
    );
}
