import React from 'react';
import { ArrowRight, TrendingUp, Clock } from 'lucide-react';

interface ValuePropositionProps {
    beforeState: string;
    afterState: string;
    metric?: string;
    timeframe?: string;
    className?: string;
}

export function ValueProposition({
    beforeState,
    afterState,
    metric,
    timeframe,
    className = "",
}: ValuePropositionProps) {
    return (
        <div className={`flex flex-col md:flex-row items-center gap-6 p-6 bg-gradient-to-br from-bg-main to-bg-beige rounded-2xl shadow-sm border border-border ${className}`}>
            
            {/* Transformation Path */}
            <div className="flex-1 flex flex-col md:flex-row items-center gap-4 text-center md:text-left w-full">
                <div className="flex-1 p-4 bg-bg-primary/50 rounded-xl">
                    <p className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-2">Vorher</p>
                    <p className="text-lg text-text-tertiary line-through decoration-border">{beforeState}</p>
                </div>
                
                <div className="hidden md:flex flex-col items-center justify-center text-primary">
                    <ArrowRight className="w-8 h-8 opacity-80" />
                </div>
                <div className="md:hidden flex flex-col items-center justify-center text-primary rotate-90 my-2">
                    <ArrowRight className="w-8 h-8 opacity-80" />
                </div>
                
                <div className="flex-1 p-4 bg-bg-primary shadow-warm rounded-xl border border-primary/10">
                    <p className="text-sm font-bold text-accent uppercase tracking-wider mb-2">Nachher</p>
                    <p className="text-xl font-bold text-text-primary">{afterState}</p>
                </div>
            </div>

            {/* Metrics (Optional) */}
            {(metric || timeframe) && (
                <div className="md:w-64 w-full flex flex-row md:flex-col justify-center gap-4 md:border-s md:border-t-0 border-t border-border/60 pt-6 md:pt-0 md:ps-6">
                    {metric && (
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 text-green-700 rounded-lg">
                                <TrendingUp className="w-5 h-5" />
                            </div>
                            <span className="font-bold text-text-primary">{metric}</span>
                        </div>
                    )}
                    {timeframe && (
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
                                <Clock className="w-5 h-5" />
                            </div>
                            <span className="font-bold text-text-primary">{timeframe}</span>
                        </div>
                    )}
                </div>
            )}
            
        </div>
    );
}
