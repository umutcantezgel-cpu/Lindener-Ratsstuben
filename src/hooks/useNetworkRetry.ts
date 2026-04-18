"use client";

import { useEffect, useCallback } from 'react';

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || "xjkvrwgq";

export function useNetworkRetry() {
    const processQueue = useCallback(async () => {
        if (!navigator.onLine) return;

        const queueStr = localStorage.getItem('form_retry_queue');
        if (!queueStr) return;

        let queue: Array<{ type: string; data: Record<string, unknown>; timestamp: number }> = [];
        try {
            queue = JSON.parse(queueStr);
        } catch (e) {
            console.error("Failed to parse form_retry_queue", e);
            return;
        }

        if (queue.length === 0) return;

        const remainingQueue = [];

        for (const item of queue) {
            try {
                if (item.type === 'contact') {
                    const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify(item.data)
                    });
                    if (!response.ok) {
                        throw new Error("Contact form retry failed");
                    }
                } else if (item.type === 'reservation') {
                    const response = await fetch('/api/reservation', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify(item.data)
                    });
                    if (!response.ok) {
                        throw new Error("Reservation form retry failed");
                    }
                }
            } catch (error) {
                console.error("Retry failed for item", item, error);
                // Keep in queue if it failed to send (e.g. server error, network drop during fetch)
                remainingQueue.push(item);
            }
        }

        localStorage.setItem('form_retry_queue', JSON.stringify(remainingQueue));
    }, []);

    useEffect(() => {
        // Run immediately on mount to catch any pending items from a previous offline session
        processQueue();

        // Run when the browser comes back online
        window.addEventListener('online', processQueue);

        return () => {
            window.removeEventListener('online', processQueue);
        };
    }, [processQueue]);
}
