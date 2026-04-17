import React from 'react';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import dynamic from 'next/dynamic';
import { KegelbahnHero } from '@/components/kegelbahn/KegelbahnHero';

const KegelbahnDetails = dynamic(() => import('@/components/kegelbahn/KegelbahnDetails').then((mod) => mod.KegelbahnDetails), {
    ssr: false,
});

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
    const t = await getTranslations({ locale, namespace: 'common' });
    return {
        title: `Kegelbahn | Lindener Ratsstuben`,
        description: `Erleben Sie unsere hochmodernen Profi-Kegelbahnen mit exklusiven Essbereichen in den Lindener Ratsstuben. Ideal für Feiern, Teamevents und Familie.`,
    };
}

export default function KegelbahnPage() {
    return (
        <main className="flex min-h-screen flex-col bg-bg-primary">
            <KegelbahnHero />
            <KegelbahnDetails />
        </main>
    );
}
