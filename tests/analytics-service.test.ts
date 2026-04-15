import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('Analytics Service', () => {
    beforeEach(() => {
        vi.resetModules();
        vi.restoreAllMocks();
    });

    it('queues events before initialization', async () => {
        const { analyticsService } = await import('@/lib/analytics/service');
        const consoleSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});

        // Should not throw even before init
        expect(() =>
            analyticsService.track({
                type: 'pageView',
                url: '/test',
                title: 'Test',
                referrer: '',
                viewportWidth: 1024,
                viewportCategory: 'desktop',
                timestamp: new Date().toISOString(),
                sessionId: 'test-session',
            })
        ).not.toThrow();

        consoleSpy.mockRestore();
    });

    it('respects consent=none by not sending', async () => {
        const { analyticsService } = await import('@/lib/analytics/service');
        // jsdom doesn't define sendBeacon, so we add it first
        Object.defineProperty(navigator, 'sendBeacon', { value: vi.fn(), writable: true, configurable: true });
        const beaconSpy = vi.spyOn(navigator, 'sendBeacon').mockReturnValue(true);

        analyticsService.initialize({ consentLevel: 'none', sessionId: 'test' });
        analyticsService.track({
            type: 'click',
            elementId: 'btn-1',
            elementType: 'button',
            timestamp: new Date().toISOString(),
            sessionId: 'test',
        });

        expect(beaconSpy).not.toHaveBeenCalled();
        beaconSpy.mockRestore();
    });
});
