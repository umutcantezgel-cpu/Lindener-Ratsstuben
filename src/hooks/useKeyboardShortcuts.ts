"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useKeyboardShortcuts() {
    const router = useRouter();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ignore key presses if the user is typing in an input, textarea, or contenteditable
            const target = e.target as HTMLElement;
            if (
                target.tagName === 'INPUT' ||
                target.tagName === 'TEXTAREA' ||
                target.tagName === 'SELECT' ||
                target.isContentEditable
            ) {
                return;
            }

            // Route shortcuts
            if (e.key === '?') {
                e.preventDefault();
                // We'd hypothetically open a help overlay here
                alert("Tastaturkürzel:\n/ : Suchen\ng+h : Startseite\ng+c : Kontakt");
                return;
            }

            // Power user path combos
            // Here we use a very basic global shortcut detection. 
            // Often, g+h implies pressing sequentially, but for simplicity here we check meta keys or pure characters if single presses.
            
            // To detect 'g' then 'h', we'd need state. For ultra-simple zero-breakage, we stick to modifiers.
            // Let's implement sequential basic matching if needed, but the requirements just specify shortcuts.
            // Simplified sequential detector for 'g' -> 'h' or 'g' -> 'c'
            
        };

        // Advanced sequential shortcut detector
        let sequence = '';
        let timeoutId: NodeJS.Timeout;

        const handleSequentialKeys = (e: KeyboardEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) return;

            if (e.key === '?') {
                // Ignore, handled by the other logic or move it here
            }

            const key = e.key.toLowerCase();
            // Store up to 2 characters
            sequence += key;
            
            if (sequence === 'gh') {
                router.push('/');
                sequence = '';
            } else if (sequence === 'gc') {
                router.push('/contact');
                sequence = '';
            }

            // Keep sequence length managed
            if (sequence.length > 2) {
                sequence = sequence.slice(-2);
            }

            // Clear after 1 second of inactivity to not glitch out
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                sequence = '';
            }, 1000);
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keydown', handleSequentialKeys);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keydown', handleSequentialKeys);
            clearTimeout(timeoutId);
        };
    }, [router]);
}
