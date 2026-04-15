import React from 'react';
import { Clock } from 'lucide-react';

interface LastUpdatedProps {
    date: string;
}

export function LastUpdated({ date }: LastUpdatedProps) {
    return (
        <div className="flex items-center gap-2 text-sm text-text-tertiary mt-8 border-t border-border pt-4">
            <Clock className="w-4 h-4" aria-hidden="true" />
            <span>Zuletzt aktualisiert am <time dateTime={new Date(date).toISOString()}>{date}</time></span>
        </div>
    );
}
