import React from 'react';
import { Skeleton } from '@/components/ui/Skeleton';

export const MenuSkeleton = () => {
    return (
        <article className="pt-32 pb-20 min-h-screen bg-bg-secondary">
            <div className="container mx-auto px-4">
                {/* Header Skeleton */}
                <header className="flex flex-col items-center text-center mb-16">
                    <Skeleton className="h-4 w-32 mb-4 rounded-md" /> {/* Subtitle */}
                    <Skeleton className="h-14 w-3/4 max-w-2xl mb-6 rounded-lg" /> {/* Title */}
                    <Skeleton className="h-6 w-full max-w-3xl mb-2 rounded-md" /> {/* Desc line 1 */}
                    <Skeleton className="h-6 w-5/6 max-w-2xl mb-6 rounded-md" /> {/* Desc line 2 */}
                </header>

                {/* Category Navigation Skeleton */}
                <div className="mb-12 flex justify-center gap-3 overflow-hidden pb-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Skeleton key={i} className="h-12 w-28 md:w-36 rounded-lg shrink-0" />
                    ))}
                </div>

                {/* Category Header Image Skeleton */}
                <Skeleton className="mb-12 w-full h-64 md:h-80 lg:h-96 rounded-2xl" />

                {/* Menu Grid Skeleton */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 xl:gap-x-16 gap-y-6">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="p-4 sm:p-6 bg-surface rounded-2xl border border-border/50 flex gap-4 sm:gap-6">
                            {/* Image Placeholder */}
                            <Skeleton className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-xl" />
                            
                            {/* Content Placeholder */}
                            <div className="flex-grow flex flex-col justify-center">
                                <div className="flex justify-between items-start sm:items-baseline mb-2 gap-3 flex-col sm:flex-row w-full">
                                    <Skeleton className="h-6 w-3/5 sm:w-2/3 rounded-md" /> {/* Title */}
                                    <div className="hidden sm:block flex-grow border-b-2 border-dotted border-border/20 relative -top-1.5" />
                                    <Skeleton className="h-6 w-16 sm:w-20 rounded-md" /> {/* Price */}
                                </div>
                                <Skeleton className="h-4 w-full mb-1.5 rounded-md" /> {/* Desc line 1 */}
                                <Skeleton className="h-4 w-4/5 rounded-md" /> {/* Desc line 2 */}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Legend Toggle Skeleton */}
                <div className="mt-16 max-w-4xl mx-auto">
                    <Skeleton className="h-16 w-full rounded-2xl" />
                </div>
                
                {/* CTA Skeleton */}
                <div className="mt-20 flex flex-col items-center justify-center gap-4">
                    <Skeleton className="h-6 w-64 mb-2 rounded-md" /> {/* Prompt */}
                    <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                        <Skeleton className="h-14 w-full sm:w-64 rounded-lg" /> {/* Res CTA */}
                    </div>
                </div>
            </div>
        </article>
    );
};
