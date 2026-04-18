"use client";

import React, { useState, useEffect } from 'react';
import Image, { getImageProps } from 'next/image';
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
    mobileSrc?: string; // Opt-in für Art-Direction
    blurDataURL?: string;
    placeholder?: 'blur' | 'empty';
};

export type AdaptiveImageProps = BaseAdaptiveImageProps & ImageVariant;

export const AdaptiveImage: React.FC<AdaptiveImageProps> = ({ src, lowResSrc, mobileSrc, blurDataURL, placeholder, className, priority, alt, ...props }) => {
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

    const commonClasses = clsx("transition-opacity duration-500", className);
    const resolvedPriority = priority || false;

    // Advanced Art-Direction mit <picture> Tag für optimale Bandbreiten-Nutzung
    if (mobileSrc) {
        const commonProps = { 
            alt: alt as string, 
            quality, 
            priority: resolvedPriority, 
            className: commonClasses,
            placeholder: placeholder,
            blurDataURL: blurDataURL,
            ...props 
        };

        const {
            props: { srcSet: desktopSrcSet },
        } = getImageProps({ ...commonProps, src: finalSrc });

        const {
            props: { srcSet: mobileSrcSet, ...rest },
        } = getImageProps({ ...commonProps, src: mobileSrc });

        return (
            <picture>
                <source media="(min-width: 768px)" srcSet={desktopSrcSet} />
                <source media="(max-width: 767px)" srcSet={mobileSrcSet} />
                <img {...rest} alt={alt as string} />
            </picture>
        );
    }

    // Default Fallback
    return (
        <Image
            src={finalSrc}
            alt={alt as string}
            className={commonClasses}
            quality={quality}
            priority={resolvedPriority}
            placeholder={placeholder}
            blurDataURL={blurDataURL}
            {...props}
        />
    );
};
