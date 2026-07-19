import React from 'react';
import { Testimonial } from '@/data/testimonials';

const StarRating = ({ rating }: { rating: number }) => {
    return (
        <div role="img" className="flex gap-1" aria-label={`Bewertung: ${rating} von 5 Sternen`}>
            {[...Array(5)].map((_, i) => (
                <svg 
                    key={i} 
                    className={`w-5 h-5 ${i < rating ? 'text-accent-400 fill-current' : 'text-border fill-current'}`} 
                    viewBox="0 0 20 20" 
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );
};

interface TestimonialCardProps {
    testimonial: Testimonial;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
    return (
        <div className="card-lift bg-bg-secondary p-8 rounded-2xl shadow-warm border border-border flex flex-col h-full">
            <div className="mb-6 flex justify-between items-start">
                <StarRating rating={testimonial.rating} />
                <span className="text-xs font-bold text-text-primary bg-border px-3 py-1 rounded-full uppercase tracking-wider">
                    {testimonial.source}
                </span>
            </div>
            <blockquote className="flex-1 text-text-secondary italic mb-6 leading-relaxed">
                &quot;{testimonial.quote}&quot;
            </blockquote>
            <div className="mt-auto border-t border-border pt-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full flex-shrink-0 bg-primary/10 flex items-center justify-center text-primary font-bold shadow-sm">
                        {testimonial.name.charAt(0)}
                    </div>
                    <span className="font-bold text-text-primary">{testimonial.name}</span>
                </div>
                <span className="text-sm text-text-secondary">{testimonial.date}</span>
            </div>
        </div>
    );
};
