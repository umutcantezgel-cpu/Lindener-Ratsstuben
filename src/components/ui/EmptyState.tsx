import React from 'react';
import { Ghost } from 'lucide-react';
import { CtaWithTrust } from './CtaWithTrust';

interface EmptyStateProps {
    title: string;
    description: string;
    actionText?: string;
    actionHref?: string;
    icon?: React.ReactNode;
}

export function EmptyState({ 
    title, 
    description, 
    actionText = "Zurück zur Startseite", 
    actionHref = "/", 
    icon = <Ghost className="w-12 h-12 text-text-tertiary mb-4" /> 
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-bg-secondary rounded-2xl border border-border">
            {icon}
            <h3 className="text-xl font-display font-bold text-text-main mb-2">
                {title}
            </h3>
            <p className="text-text-secondary max-w-md mx-auto mb-8">
                {description}
            </p>
            <CtaWithTrust 
                href={actionHref}
                customText={actionText}
                variant="secondary"
                trustKey="default"
            />
        </div>
    );
}
