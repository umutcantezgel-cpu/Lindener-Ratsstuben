'use client';

import React from 'react';
import { PageTransition } from '@/components/effects/PageTransition';
import { KegelHero } from '@/components/kegelbahn/KegelHero';
import { KegelFeatures } from '@/components/kegelbahn/KegelFeatures';
import { KegelPricing } from '@/components/kegelbahn/KegelPricing';
import { KegelCatering } from '@/components/kegelbahn/KegelCatering';
import { KegelRules } from '@/components/kegelbahn/KegelRules';
import { KegelFAQ } from '@/components/kegelbahn/KegelFAQ';
import { KegelBookingCTA } from '@/components/kegelbahn/KegelBookingCTA';

interface KegelClientProps {
    locale?: string;
}

const KegelClient: React.FC<KegelClientProps> = ({ locale }) => {
    return (
        <PageTransition>
            <article className="min-h-screen bg-bg-primary" itemProp="mainContentOfPage">
                <KegelHero locale={locale} />
                <KegelFeatures />
                <KegelPricing />
                <KegelCatering />
                <KegelRules />
                <KegelFAQ />
                <KegelBookingCTA />
            </article>
        </PageTransition>
    );
};

export default KegelClient;
