import React from 'react';
import { Check, X } from 'lucide-react';

interface FeatureRow {
    feature: string;
    us: boolean | string;
    competitor: boolean | string;
}

interface ComparisonTableProps {
    title: string;
    usName?: string;
    competitorName?: string;
    features: FeatureRow[];
}

export function ComparisonTable({ 
    title, 
    usName = "Unser Haus", 
    competitorName = "Durchschnittlich", 
    features 
}: ComparisonTableProps) {
    return (
        <section className="my-12 overflow-hidden bg-bg-secondary rounded-2xl shadow-sm border border-border" aria-labelledby="comparison-title">
            <h3 id="comparison-title" className="p-6 text-xl font-bold border-b border-border bg-bg-primary">
                {title}
            </h3>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-bg-tertiary">
                        <tr>
                            <th className="p-4 font-semibold text-text-secondary w-1/2">Leistung</th>
                            <th className="p-4 font-bold text-primary w-1/4 bg-primary/5">{usName}</th>
                            <th className="p-4 font-semibold text-text-tertiary w-1/4">{competitorName}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {features.map((row, i) => (
                            <tr key={i} className="hover:bg-bg-primary transition-colors">
                                <td className="p-4 text-text-primary font-medium">{row.feature}</td>
                                <td className="p-4 bg-primary/5">
                                    {typeof row.us === 'boolean' 
                                        ? row.us ? <Check className="text-status-success w-5 h-5" /> : <X className="text-status-error w-5 h-5" />
                                        : <span className="text-primary font-semibold">{row.us}</span>}
                                </td>
                                <td className="p-4">
                                    {typeof row.competitor === 'boolean' 
                                        ? row.competitor ? <Check className="text-status-success w-5 h-5" /> : <X className="text-status-error w-5 h-5" />
                                        : <span className="text-text-secondary">{row.competitor}</span>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
