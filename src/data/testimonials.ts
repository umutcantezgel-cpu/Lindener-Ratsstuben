import { Id, createId } from '@/types';

export type PrimaryInterest = 'kultur' | 'natur' | 'kulinarik' | 'business' | 'romantik' | 'familie' | 'general';

export interface Testimonial {
    id: Id;
    name: string;
    rating: number;
    quote: string;
    source: string;
    date: string;
    avatar?: string;
    segment?: PrimaryInterest;
}

export const testimonials: Testimonial[] = [
    {
        id: createId("t1"),
        name: "Michael K.",
        rating: 5,
        quote: "Der Lindener Rucksack ist ein Traum! Sehr authentisch, große Portionen und unglaublich freundlicher Service. Wir kommen auf jeden Fall wieder.",
        source: "Google Reviews",
        date: "Vor 2 Wochen",
        segment: 'familie',
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
    },
    {
        id: createId("t2"),
        name: "Sabrina M.",
        rating: 5,
        quote: "Wir haben unseren Jahrestag hier gefeiert. Die Kombination aus erstklassigem Essen und hervorragender Weinbegleitung war perfekt.",
        source: "TripAdvisor",
        date: "Vor 1 Monat",
        segment: 'romantik',
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d"
    },
    {
        id: createId("t3"),
        name: "Dr. Thomas L.",
        rating: 5,
        quote: "Diskret, exzellenter Service und ein fantastisches Menü. Perfekter Abschluss für unser erfolgreiches Firmen-Event.",
        source: "Google Reviews",
        date: "Vor 3 Monaten",
        segment: 'business',
        avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d"
    },
    {
        id: createId("t4"),
        name: "Jana S.",
        rating: 5,
        quote: "Nach der ausgiebigen Dünsberg-Wanderung genau das Richtige: Herzhafte, meisterhafte Küche in wunderbarem Ambiente.",
        source: "Google Reviews",
        date: "Vor 2 Tagen",
        segment: 'natur',
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026702d"
    },
    {
        id: createId("t5"),
        name: "Marcus H.",
        rating: 5,
        quote: "Wirklich Gourmet-Niveau. Jedes Gericht ist ein Kunstwerk. Ein Muss für jeden echten Feinschmecker.",
        source: "TripAdvisor",
        date: "Vor 1 Woche",
        segment: 'kulinarik',
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026703d"
    }

];

// ═══ GETTER FUNKTIONEN (STRICT TYPED ARCHITECTURE) ═══
export function getAllTestimonials(): Testimonial[] {
    return [...testimonials];
}

export function getTestimonialsBySegment(segment: PrimaryInterest | 'general'): Testimonial[] {
    if (segment === 'general') return getAllTestimonials().slice(0, 3);
    
    // Sort array so the target segment comes first
    const sorted = [...testimonials].sort((a, b) => {
        if (a.segment === segment) return -1;
        if (b.segment === segment) return 1;
        return 0;
    });
    
    return sorted.slice(0, 3);
}

export function getTestimonialById(id: Id | string): Testimonial | undefined {
    const targetId = typeof id === 'string' ? id : (id as string);
    return testimonials.find(t => (t.id as unknown as string) === targetId);
}

// ═══ DEVELOPMENT-MODE ASSERTIONS ═══
if (process.env.NODE_ENV === 'development') {
    const tIds = new Set<string>();
    for (const t of testimonials) {
        if (tIds.has(t.id as unknown as string)) {
            console.error(`[Data Layer] ERROR: Duplicate Testimonial ID: ${t.id as unknown as string}`);
        }
        tIds.add(t.id as unknown as string);
        if (t.rating < 1 || t.rating > 5) {
            console.warn(`[Data Layer] WARN: Testimonial rating out of bound: ${t.id as unknown as string}`);
        }
    }
}
