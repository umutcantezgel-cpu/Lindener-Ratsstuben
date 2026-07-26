import React from 'react';
import { getAllTestimonials } from '@/data/testimonials';
import { ReviewCarousel } from '@/components/interactive/ReviewCarousel';
interface TestimonialSectionProps {
  /** Section heading override */
  heading?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Server Component that renders all testimonials in a responsive grid.
 * Consumes getAllTestimonials() from the Phase-2 data layer.
 *
 * With only 3 testimonials, a static grid is more appropriate
 * than a carousel — no unnecessary JS shipped to the client.
 */
export function TestimonialSection({
  heading = 'Was unsere Gäste sagen',
  className,
}: TestimonialSectionProps) {
  // We slice to 15 testimonials to avoid massive HTML bloat
  // Rendering 241 testimonials generates thousands of SVG stars and crashes SEO crawlers (Seobility)
  const testimonials = getAllTestimonials().slice(0, 15);

  if (testimonials.length === 0) return null;

  return (
    <section
      className={`py-16 sm:py-20 bg-bg-secondary ${className || ''}`}
      aria-labelledby="testimonials-heading"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2
            id="testimonials-heading"
            className="text-3xl sm:text-4xl font-display font-bold text-text-primary mb-3"
          >
            {heading}
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Authentische Bewertungen unserer Gäste auf Google und TripAdvisor.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="w-full">
          <ReviewCarousel testimonials={testimonials} />
        </div>
      </div>
    </section>
  );
}
