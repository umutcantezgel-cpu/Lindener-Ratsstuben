import React from 'react';
import { Check } from 'lucide-react';

interface PricingCardProps {
    title: string;
    price: string;
    period?: string;
    description: string;
    features: string[];
    alternativeComparison?: {
        name: string;
        price: string;
    };
    dailyEquivalent?: string;
    roiTimeframe?: string;
    ctaText: string;
    ctaLink: string;
    isPopular?: boolean;
}

export function PricingCard({
    title,
    price,
    period,
    description,
    features,
    alternativeComparison,
    dailyEquivalent,
    roiTimeframe,
    ctaText,
    ctaLink,
    isPopular
}: PricingCardProps) {
    return (
        <div className={`relative flex flex-col p-8 rounded-2xl bg-surface border ${isPopular ? 'border-primary shadow-warm' : 'border-border'} transition-all`}>
            {isPopular && (
                <div className="absolute top-0 right-8 -translate-y-1/2">
                    <span className="bg-primary text-surface text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                        Empfehlung
                    </span>
                </div>
            )}
            
            <h3 className="text-2xl font-display font-bold text-text-primary mb-2">{title}</h3>
            <p className="text-text-secondary text-sm mb-6">{description}</p>
            
            <div className="mb-6">
                <div className="flex items-end gap-1">
                    <span className="text-4xl font-bold text-text-primary">{price}</span>
                    {period && <span className="text-text-secondary mb-1">{period}</span>}
                </div>
                
                {/* Contextual Cost Reducers */}
                {(alternativeComparison || dailyEquivalent || roiTimeframe) && (
                    <div className="mt-4 p-3 bg-bg-secondary rounded-lg border border-primary/10">
                        {alternativeComparison && (
                            <p className="text-xs text-text-secondary mb-1">
                                Vergleichbar mit <span className="font-semibold text-text-primary">{alternativeComparison.name}</span> ({alternativeComparison.price})
                            </p>
                        )}
                        {dailyEquivalent && (
                            <p className="text-xs text-text-secondary mb-1">
                                Entspricht <span className="font-semibold text-primary">{dailyEquivalent}</span>
                            </p>
                        )}
                        {roiTimeframe && (
                            <p className="text-xs text-text-secondary">
                                Amortisiert sich in <span className="font-semibold text-text-primary">{roiTimeframe}</span>
                            </p>
                        )}
                    </div>
                )}
            </div>
            
            <ul className="flex-1 space-y-4 mb-8">
                {features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-text-primary">
                        <Check className="w-5 h-5 text-primary shrink-0" />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
            
            <a 
                href={ctaLink}
                className={`text-center py-4 rounded-xl font-bold transition-all ${isPopular ? 'bg-primary text-surface hover:bg-primary-hover' : 'bg-bg-secondary text-text-primary hover:bg-border'}`}
                data-cta="true"
            >
                {ctaText}
            </a>
        </div>
    );
}
