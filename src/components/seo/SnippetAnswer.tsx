import React from 'react';
import Script from 'next/script';

interface SnippetAnswerProps {
    question: string;
    shortAnswer: string;
    detailedAnswer?: React.ReactNode;
    headingLevel?: "h2" | "h3";
}

export function SnippetAnswer({ 
    question, 
    shortAnswer, 
    detailedAnswer, 
    headingLevel = "h3" 
}: SnippetAnswerProps) {
    const HeadingTag = headingLevel;

    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [{
            "@type": "Question",
            "name": question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": shortAnswer
            }
        }]
    };

    return (
        <section className="mb-8" aria-labelledby={`faq-${question.replace(/\s+/g, '-').toLowerCase()}`}>
            <Script 
                id={`snippet-schema-${question.replace(/\s+/g, '-')}`}
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
            <HeadingTag 
                id={`faq-${question.replace(/\s+/g, '-').toLowerCase()}`}
                className="text-2xl font-bold text-text-primary mb-3"
            >
                {question}
            </HeadingTag>
            
            {/* The Featured Snippet target: 40-60 words format directly under the heading */}
            <p className="text-lg font-medium text-text-secondary leading-relaxed mb-4 border-l-4 border-primary pl-4">
                {shortAnswer}
            </p>

            {detailedAnswer && (
                <div className="text-text-secondary space-y-4">
                    {detailedAnswer}
                </div>
            )}
        </section>
    );
}
