import React from 'react';
import { PageTransition } from '@/components/effects/PageTransition';
import { TrustBadgeRow } from '@/components/ui/TrustBadgeRow';
import dynamic from 'next/dynamic';

const ReservationInteractive = dynamic(() => import('./ReservationInteractive').then(mod => mod.ReservationInteractive), { 
    loading: () => <div className="w-full max-w-2xl mx-auto h-[600px] rounded-xl bg-neutral-200/50 dark:bg-neutral-800/50 animate-pulse" /> 
});

export const Reservation = () => {
    return (
        <PageTransition>
            <article className="pt-32 pb-20 min-h-screen bg-bg-beige flex items-center justify-center" itemProp="mainContentOfPage">
                <div className="container mx-auto px-4">
                    <ReservationInteractive />
                    <div className="mt-16 max-w-2xl mx-auto opacity-70">
                        <TrustBadgeRow />
                    </div>
                </div>
            </article>
        </PageTransition>
    );
};

export default Reservation;
