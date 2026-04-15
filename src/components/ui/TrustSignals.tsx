import React from 'react';
import { ShieldCheck, Star, Lock, CheckCircle2 } from 'lucide-react';

export type TrustSignalType = 'guarantee' | 'rating' | 'security' | 'testimonial' | 'bullet';

interface TrustSignalsProps {
    type: TrustSignalType;
    text: string;
    subText?: string;
    className?: string;
}

export function TrustSignals({ type, text, subText, className = "" }: TrustSignalsProps) {
    
    const renderContent = () => {
        switch (type) {
            case 'guarantee':
                return (
                    <div className="flex items-center gap-2 text-sm font-medium text-text-secondary">
                        <ShieldCheck className="w-4 h-4 text-primary" />
                        <span>{text}</span>
                    </div>
                );
            case 'rating':
                return (
                    <div className="flex items-center gap-2">
                        <div className="flex -space-x-1">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <Star key={s} className="w-3.5 h-3.5 text-accent-500 fill-current" />
                            ))}
                        </div>
                        <span className="text-xs font-bold text-text-primary">{text}</span>
                        {subText && <span className="text-xs text-text-secondary">({subText})</span>}
                    </div>
                );
            case 'security':
                return (
                    <div className="flex items-center gap-2 text-xs text-text-secondary">
                        <Lock className="w-3 h-3" />
                        <span>{text}</span>
                    </div>
                );
            case 'testimonial':
                return (
                    <div className="flex items-center gap-3 text-sm italic text-text-secondary bg-surface px-3 py-2 rounded-lg border border-border">
                        <div className="w-6 h-6 bg-border rounded-full flex items-center justify-center overflow-hidden shrink-0">
                            {/* Placeholder Avatar */}
                            <svg className="w-4 h-4 text-text-secondary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                        </div>
                        <p>&quot;{text}&quot; <span className="font-bold not-italic text-text-primary">{subText}</span></p>
                    </div>
                );
            case 'bullet':
                return (
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span>{text}</span>
                    </div>
                );
        }
    };

    return (
        <div className={`inline-flex ${className}`}>
            {renderContent()}
        </div>
    );
}
