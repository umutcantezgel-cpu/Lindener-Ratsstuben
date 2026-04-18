import React from 'react';
import { AdaptiveImage as Image } from '@/components/ui/AdaptiveImage';

interface Credential {
    id: string;
    name: string;
    logoUrl?: string; // Opt
    icon?: React.ReactNode;
}

interface CredentialBarProps {
    credentials: Credential[];
    title?: string;
    className?: string;
}

export function CredentialBar({ credentials, title = "Bekannt aus & Zertifiziert von", className = "" }: CredentialBarProps) {
    return (
        <div className={`py-8 border-y border-border-hover/10 bg-bg-primary ${className}`}>
            <div className="container mx-auto px-4">
                <p className="text-center text-xs font-bold text-text-tertiary uppercase tracking-widest mb-6">
                    {title}
                </p>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    {credentials.map((cred) => (
                        <div key={cred.id} className="flex items-center justify-center min-w-[120px]">
                            {cred.logoUrl ? (
                                <Image
                                    src={cred.logoUrl}
                                    alt={cred.name}
                                    width={120}
                                    height={40}
                                    className="object-contain h-8 w-auto mix-blend-multiply"
                                />
                            ) : cred.icon ? (
                                <div className="flex items-center gap-2 text-text-secondary">
                                    {cred.icon}
                                    <span className="font-bold font-display">{cred.name}</span>
                                </div>
                            ) : (
                                <span className="font-bold font-display text-text-tertiary text-lg">{cred.name}</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
