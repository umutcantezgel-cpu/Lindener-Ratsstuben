"use client";

import React, { useState, useEffect } from 'react';
import Image from '@/components/ui/ImagePlaceholder';
import type { ImageProps } from 'next/image';
import { useDevice } from '@/lib/context/DeviceContext';
import { clsx } from 'clsx';

// Strict accessibility typings for images (Phase 8)
type DescriptiveImageProps = {
    alt: string; // Must not be empty for informative images
    decorative?: false;
};

type DecorativeImageProps = {
    alt: ""; // Must be precisely empty string
    decorative: true; // Must be explicitly marked as decorative
    'aria-hidden'?: boolean;
};

export type ImageVariant = DescriptiveImageProps | DecorativeImageProps;

type BaseAdaptiveImageProps = Omit<ImageProps, 'src' | 'alt' | 'decorative'> & {
    src: string;
    lowResSrc?: string;
};

export type AdaptiveImageProps = BaseAdaptiveImageProps & ImageVariant;

export const AdaptiveImage: React.FC<AdaptiveImageProps> = ({ src, lowResSrc, className, priority, alt, ...props }) => {
    const { connection, saveData } = useDevice();
    const [finalSrc, setFinalSrc] = useState<string>(src);
    const [quality, setQuality] = useState<number>(75);

    useEffect(() => {
        // Evaluate connection status to adjust image properties
        if (connection === 'offline' || connection === 'slow-2g' || connection === '2g' || saveData) {
            setQuality(60);
            if (lowResSrc) {
                setFinalSrc(lowResSrc);
            }
        } else if (connection === '3g') {
            setQuality(70);
            setFinalSrc(src);
        } else {
            setQuality(85);
            setFinalSrc(src);
        }
    }, [connection, saveData, src, lowResSrc]);

    return (
        <Image
            src={finalSrc}
            alt={alt}
            className={clsx("transition-opacity duration-500", className)}
            quality={quality}
            priority={priority || false} // Provide explicit false fallback
            {...props}
        />
    );
};
