'use client';
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle2, Users, Calendar, Trophy, Utensils, Music, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const features = [
    {
        icon: <Trophy className="w-8 h-8 text-primary" />,
        title: "3 Profi-Kegelbahnen",
        description: "Modernste Anlagentechnik für präzise Würfe und automatische Punkteauswertung."
    },
    {
        icon: <Utensils className="w-8 h-8 text-primary" />,
        title: "3 Private Essbereiche",
        description: "Direkt an den Bahnen gelegen, servieren wir frische Speisen und kühle Getränke."
    },
    {
        icon: <Music className="w-8 h-8 text-primary" />,
        title: "Multimedia & Sound",
        description: "Steuern Sie Ihre eigene Musik und erleben Sie großartige Akustik."
    },
    {
        icon: <Users className="w-8 h-8 text-primary" />,
        title: "Für jedes Event",
        description: "Egal ob Kindergeburtstag, Junggesellenabschied oder Firmen-Event."
    }
];

export const KegelbahnDetails: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    return (
        <section className="py-24 md:py-32 bg-surface overflow-hidden relative">
            <div className="container mx-auto px-6 max-w-7xl relative z-10" ref={containerRef}>
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h2 className="text-3xl md:text-5xl font-display font-light mb-6 tracking-tight text-text-primary">
                            Mehr als nur <span className="font-medium text-primary">Kegeln</span>
                        </h2>
                        <p className="text-lg text-text-secondary leading-relaxed mb-10">
                            Unsere Kegelbahn bietet die perfekte Kombination aus sportlichem Ehrgeiz und erstklassiger Gastronomie. Mit unseren <strong className="text-text-primary">3 unabhängig separierbaren Essbereichen</strong> haben Sie die perfekten Räumlichkeiten für kleine und große Gesellschaften.
                        </p>

                        <div className="space-y-6">
                            {features.map((feature, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                    transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                                    className="flex items-start gap-5 group"
                                >
                                    <div className="p-3 rounded-2xl bg-bg-secondary border border-border group-hover:border-primary/50 transition-colors">
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-medium text-text-primary mb-2">{feature.title}</h3>
                                        <p className="text-text-secondary">{feature.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right content - Pricing / Booking Hook */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                        className="relative"
                    >
                        {/* Decorative background blur */}
                        <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-transparent blur-2xl rounded-[3rem] -z-10" />
                        
                        <div className="bg-bg-primary/80 backdrop-blur-xl border border-border rounded-[2.5rem] p-10 lg:p-14 shadow-elevation-2 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
                            
                            <h3 className="text-3xl font-display font-medium text-text-primary mb-4">
                                Tarife & Buchung
                            </h3>
                            <p className="text-text-secondary mb-10">
                                Sichern Sie sich Ihre Bahn. Wir empfehlen eine frühzeitige Reservierung, besonders an Wochenenden.
                            </p>

                            <div className="space-y-4 mb-10">
                                <div className="flex justify-between items-end border-b border-border pb-4">
                                    <div>
                                        <span className="block text-sm text-text-tertiary mb-1">Montag - Donnerstag</span>
                                        <span className="text-lg font-medium text-text-primary">Pro Stunde / Bahn</span>
                                    </div>
                                    <span className="text-2xl font-display font-medium text-primary">15€</span>
                                </div>
                                <div className="flex justify-between items-end border-b border-border pb-4">
                                    <div>
                                        <span className="block text-sm text-text-tertiary mb-1">Freitag - Sonntag</span>
                                        <span className="text-lg font-medium text-text-primary">Pro Stunde / Bahn</span>
                                    </div>
                                    <span className="text-2xl font-display font-medium text-primary">20€</span>
                                </div>
                            </div>

                            <ul className="space-y-4 mb-10">
                                <li className="flex items-center gap-3 text-text-secondary">
                                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                                    Bis zu 10 Personen pro Bahn
                                </li>
                                <li className="flex items-center gap-3 text-text-secondary">
                                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                                    Inklusive Leihschuhe
                                </li>
                                <li className="flex items-center gap-3 text-text-secondary">
                                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                                    A-la-carte oder Buffet möglich
                                </li>
                            </ul>

                            <Link href="/reservation" className="group flex items-center justify-between w-full p-5 bg-text-primary text-surface rounded-2xl hover:bg-primary transition-colors duration-300">
                                <div className="flex flex-col">
                                    <span className="text-lg font-medium">Reservierung Anfragen</span>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-surface/20 flex items-center justify-center group-hover:bg-surface group-hover:text-primary transition-colors">
                                    <ChevronRight className="w-5 h-5" />
                                </div>
                            </Link>

                            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-text-tertiary">
                                <Calendar className="w-4 h-4" />
                                Schnelle Bestätigung garantiert
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
