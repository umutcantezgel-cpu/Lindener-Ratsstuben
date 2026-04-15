"use client";

import { useEffect, useRef } from 'react';

// Manages focus specifically for modals or trap-environments
export function useFocusManagement(isOpen: boolean, onClose: () => void) {
    const containerRef = useRef<HTMLDivElement>(null);
    const previousFocusRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (isOpen) {
            // Save the node we were on before opening
            previousFocusRef.current = document.activeElement as HTMLElement;

            // Simple trap logic: finding all focusable elements inside container
            const focusableElements = containerRef.current?.querySelectorAll(
                'a[href], button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
            ) as NodeListOf<HTMLElement>;

            if (focusableElements && focusableElements.length > 0) {
                // Focus the first element when it opens
                focusableElements[0].focus();
            }

            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === 'Escape') {
                    onClose();
                    return;
                }

                if (e.key === 'Tab') {
                    if (!focusableElements || focusableElements.length === 0) return;

                    const firstElement = focusableElements[0];
                    const lastElement = focusableElements[focusableElements.length - 1];

                    if (e.shiftKey) {
                        if (document.activeElement === firstElement) {
                            e.preventDefault();
                            lastElement.focus();
                        }
                    } else {
                        if (document.activeElement === lastElement) {
                            e.preventDefault();
                            firstElement.focus();
                        }
                    }
                }
            };

            document.addEventListener('keydown', handleKeyDown);

            return () => {
                document.removeEventListener('keydown', handleKeyDown);
                // Restore focus back to the trigger button
                if (previousFocusRef.current) {
                    previousFocusRef.current.focus();
                }
            };
        }
    }, [isOpen, onClose]);

    return { containerRef };
}
