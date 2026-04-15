"use client";

import { useState, useEffect } from 'react';

/**
 * Debounce Hook — delays value updates by the specified duration.
 * Useful for search inputs, resize handlers, and validation.
 */
export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
}
