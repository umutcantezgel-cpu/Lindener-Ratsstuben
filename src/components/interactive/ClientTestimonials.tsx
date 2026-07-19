"use client";
import React from 'react';
import { useAdaptiveMessaging } from '@/hooks/useAdaptiveMessaging';
import { getTestimonialsBySegment } from '@/data/testimonials';
import { ReviewCarousel } from './ReviewCarousel';



export function ClientTestimonials() {
    const { heroVariant } = useAdaptiveMessaging();
    const testimonials = getTestimonialsBySegment(heroVariant || 'general');

    return <ReviewCarousel testimonials={testimonials} />;
}
