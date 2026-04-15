import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock Next.js navigation
vi.mock('next/navigation', () => ({
    usePathname: () => '/',
    useSearchParams: () => new URLSearchParams(),
    useRouter: () => ({
        push: vi.fn(),
        replace: vi.fn(),
        prefetch: vi.fn(),
        back: vi.fn(),
    }),
}));

// Mock next/image
vi.mock('next/image', () => ({
    default: vi.fn().mockReturnValue(null),
}));

// Mock next/link
vi.mock('next/link', () => ({
    default: vi.fn().mockReturnValue(null),
}));
