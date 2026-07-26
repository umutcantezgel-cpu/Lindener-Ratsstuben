"use client";
import React from 'react';
import { useAdaptiveMessaging } from '@/hooks/useAdaptiveMessaging';
import { getTestimonialsBySegment } from '@/data/testimonials';
import { ReviewCarousel } from './ReviewCarousel';
import { useTranslation } from '@/lib/i18n/use-translation';

export function ClientTestimonials() {
    const { heroVariant } = useAdaptiveMessaging();
    const { locale } = useTranslation('common');
    
    // Offset testimonials based on locale to prevent duplicate content blocks across languages
    const startIndex = locale === 'de' ? 0 : (locale === 'en' ? 15 : 30);
    const testimonials = getTestimonialsBySegment(heroVariant || 'general').slice(startIndex, startIndex + 15);

    return <ReviewCarousel testimonials={testimonials} />;
}
