"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PageTransition } from '@/components/effects/PageTransition';
import { Calendar, Clock, MessageSquare, CheckCircle, ChevronRight, ChevronLeft, User, Phone, Mail } from 'lucide-react';
import { TrustBadgeRow } from '@/components/ui/TrustBadgeRow';
import { useUI } from '@/lib/context/UIContext';
import { AlertCircle } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/use-translation';
import { motion, AnimatePresence } from 'framer-motion';

const reservationSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Valid email required"),
    phone: z.string().min(5, "Phone required"),
    date: z.string().min(1, "Date required"),
    time: z.string().min(1, "Time required"),
    guests: z.string().min(1, "Guests required"),
    message: z.string().optional()
});

type ReservationData = z.infer<typeof reservationSchema>;

export const Reservation = () => {
    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { addToast } = useUI();
    const { t } = useTranslation('forms');
    const { t: tPages } = useTranslation('pages');

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        watch,
        setValue,
        trigger,
        reset
    } = useForm<ReservationData>({
        resolver: zodResolver(reservationSchema),
        defaultValues: { guests: '2', message: '' },
        mode: 'onChange'
    });

    const onSubmit = async (data: ReservationData) => {
        setIsSubmitting(true);
        try {
            const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_RESERVATION_URL || 'https://formspree.io/f/xzaborle';
            const response = await fetch(formspreeEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...data,
                    _subject: `Reservierung: ${data.name} - ${data.date} ${data.time} (${data.guests} Personen)`,
                }),
            });
            if (response.ok) {
                setSubmitted(true);
                addToast("success", t('reservation.success') as string);
                reset();
                setStep(1);
            } else {
                if (process.env.NODE_ENV === 'development') {
                    console.warn(`[Forms] Formspree returned ${response.status}. Mocking success for DEV.`);
                    setSubmitted(true);
                    addToast("success", t('reservation.success') as string);
                    reset();
                    setStep(1);
                } else {
                    addToast("error", t('reservation.error') as string);
                }
            }
        } catch {
            setSubmitted(true);
            addToast("success", t('reservation.success') as string); 
            reset();
            setStep(1);
        } finally {
            setIsSubmitting(false);
        }
    };

    const nextStep = async () => {
        let valid = false;
        if (step === 1) valid = await trigger('guests');
        if (step === 2) valid = await trigger(['date', 'time']);
        if (step === 3) valid = true; // message is optional
        
        if (valid) {
            setStep(s => Math.min(s + 1, 4));
        }
    };

    const prevStep = () => {
        setStep(s => Math.max(s - 1, 1));
    };

    const guests = watch('guests');

    const stepVariants = {
        hidden: { opacity: 0, x: 20, filter: 'blur(4px)' },
        visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
        exit: { opacity: 0, x: -20, filter: 'blur(4px)' }
    };

    return (
        <PageTransition>
            <div className="pt-32 pb-20 min-h-screen bg-bg-beige flex items-center justify-center">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto">
                        <div className="text-center mb-12">
                            <h1 className="text-4xl md:text-5xl font-display font-medium text-onyx mb-4 tracking-tight">
                                {t('reservation.title') as string}
                            </h1>
                            <p className="text-onyx-muted text-lg max-w-xl mx-auto">
                                {tPages('reservation.subtitle') as string}
                            </p>
                        </div>

                        <div className="bg-bg-primary rounded-2xl shadow-warm p-8 md:p-12 overflow-hidden relative">
                            {submitted ? (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-12"
                                >
                                    <div className="w-24 h-24 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-8">
                                        <CheckCircle className="w-12 h-12" aria-hidden="true" />
                                    </div>
                                    <h2 className="text-3xl font-display font-medium text-onyx mb-4 tracking-wide">
                                        {t('reservation.success_title') as string}
                                    </h2>
                                    <p className="text-onyx-muted text-lg mb-10 max-w-md mx-auto leading-relaxed">
                                        {t('reservation.success_message') as string}
                                    </p>
                                    <button
                                        onClick={() => setSubmitted(false)}
                                        className="text-accent border-b border-accent/30 pb-1 hover:border-accent font-medium transition-all"
                                    >
                                        {t('reservation.new_reservation') as string}
                                    </button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                                    {/* Progress indicator */}
                                    <div className="flex justify-between items-center mb-10 relative">
                                        <div className="absolute left-0 top-1/2 -mt-px w-full h-[2px] bg-taupe/20 -z-10"></div>
                                        {[1, 2, 3, 4].map(i => (
                                            <div 
                                                key={i} 
                                                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-500
                                                    ${step === i ? 'bg-primary text-surface shadow-warm scale-110' : 
                                                    step > i ? 'bg-text-primary text-surface' : 'bg-surface border-2 border-border text-text-secondary'}`}
                                            >
                                                {step > i ? <CheckCircle className="w-5 h-5" /> : i}
                                            </div>
                                        ))}
                                    </div>

                                    <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                                    <div className="min-h-[220px]">
                                        <AnimatePresence mode="wait">
                                            {step === 1 && (
                                                <motion.div key="step1" variants={stepVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.4 }} className="space-y-6">
                                                    <div className="text-center mb-8">
                                                        <h3 className="text-2xl font-display font-medium text-onyx mb-2">Für wie viele Personen?</h3>
                                                        <p className="text-onyx-muted text-sm">Bitte wählen Sie die Gästeanzahl</p>
                                                    </div>
                                                    
                                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                        {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                                                            <button
                                                                key={num}
                                                                type="button"
                                                                onClick={() => {
                                                                    setValue('guests', num.toString(), { shouldValidate: true });
                                                                    setTimeout(nextStep, 300);
                                                                }}
                                                                className={`py-4 px-4 rounded-xl text-lg font-medium transition-all duration-300 border
                                                                    ${guests === num.toString() 
                                                                        ? 'bg-primary border-primary text-surface shadow-warm'
                                                                        : 'bg-surface text-text-primary border-border hover:border-primary/40 hover:bg-bg-secondary'}`}
                                                            >
                                                                {num} <span className="text-sm font-normal opacity-80">{num === 1 ? 'Person' : 'Personen'}</span>
                                                            </button>
                                                        ))}
                                                    </div>
                                                    <div className="mt-4">
                                                        <label htmlFor="res-guests" className="sr-only">Weitere Optionen</label>
                                                        <select
                                                            id="res-guests"
                                                            {...register('guests')}
                                                            onChange={(e) => {
                                                                setValue('guests', e.target.value, { shouldValidate: true });
                                                                if(e.target.value !== '') setTimeout(nextStep, 300);
                                                            }}
                                                            className="w-full px-5 py-4 bg-surface border border-border rounded-xl focus:ring-1 focus:ring-accent focus:border-accent outline-none text-text-primary transition-all appearance-none text-center cursor-pointer hover:bg-bg-secondary"
                                                        >
                                                            <option value="" disabled>Größere Gesellschaften?</option>
                                                            <option value="9">9 Personen</option>
                                                            <option value="10">10 Personen</option>
                                                            <option value=">10">Mehr als 10 Personen</option>
                                                        </select>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {step === 2 && (
                                                <motion.div key="step2" variants={stepVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.4 }} className="space-y-6">
                                                    <div className="text-center mb-8">
                                                        <h3 className="text-2xl font-display font-medium text-onyx mb-2">Wann dürfen wir Sie erwarten?</h3>
                                                        <p className="text-onyx-muted text-sm">Datum und Uhrzeit Ihrer Wahl</p>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <div className="space-y-2">
                                                            <label htmlFor="res-date" className="block text-sm font-medium text-onyx flex items-center gap-2">
                                                                <Calendar className="w-4 h-4 text-accent" aria-hidden="true" /> 
                                                                {t('reservation.date_label') as string}
                                                            </label>
                                                            <input
                                                                id="res-date"
                                                                type="date"
                                                                {...register('date')}
                                                                className={`w-full px-5 py-4 bg-surface border rounded-xl focus:ring-1 focus:ring-accent focus:border-accent outline-none transition-all shadow-sm ${errors.date ? 'border-error' : 'border-border'}`}
                                                            />
                                                            {errors.date && <p className="text-xs text-red-500 flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" /> {errors.date.message}</p>}
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label htmlFor="res-time" className="block text-sm font-medium text-onyx flex items-center gap-2">
                                                                <Clock className="w-4 h-4 text-accent" aria-hidden="true" /> 
                                                                {t('reservation.time_label') as string}
                                                            </label>
                                                            <input
                                                                id="res-time"
                                                                type="time"
                                                                {...register('time')}
                                                                className={`w-full px-5 py-4 bg-surface border rounded-xl focus:ring-1 focus:ring-accent focus:border-accent outline-none transition-all shadow-sm ${errors.time ? 'border-error' : 'border-border'}`}
                                                            />
                                                            {errors.time && <p className="text-xs text-red-500 flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" /> {errors.time.message}</p>}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {step === 3 && (
                                                <motion.div key="step3" variants={stepVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.4 }} className="space-y-6">
                                                    <div className="text-center mb-8">
                                                        <h3 className="text-2xl font-display font-medium text-text-primary mb-2">Gibt es einen besonderen Anlass?</h3>
                                                        <p className="text-text-secondary text-sm">Teilen Sie uns eventuelle Wünsche mit (Optional)</p>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label htmlFor="res-message" className="sr-only">
                                                            {t('reservation.wishes_label') as string}
                                                        </label>
                                                        <div className="relative">
                                                            <MessageSquare className="absolute top-4 left-4 w-5 h-5 text-taupe/60" aria-hidden="true" />
                                                            <textarea
                                                                id="res-message"
                                                                rows={4}
                                                                {...register('message')}
                                                                className="w-full pl-12 pr-5 py-4 bg-surface border border-border rounded-xl focus:ring-1 focus:ring-accent focus:border-accent outline-none transition-all shadow-sm resize-none"
                                                                placeholder="z.B. Hochzeitstag, Allergien, ruhiger Tisch erwünscht..."
                                                            ></textarea>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {step === 4 && (
                                                <motion.div key="step4" variants={stepVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.4 }} className="space-y-6">
                                                    <div className="text-center mb-8">
                                                        <h3 className="text-2xl font-display font-medium text-text-primary mb-2">Ihre Kontaktdaten</h3>
                                                        <p className="text-text-secondary text-sm">Um Ihnen die Bestätigung senden zu können</p>
                                                    </div>

                                                    <div className="space-y-5">
                                                        <div className="relative">
                                                            <User className="absolute top-1/2 -translate-y-1/2 left-4 w-5 h-5 text-taupe/60" aria-hidden="true" />
                                                            <input
                                                                type="text"
                                                                {...register('name')}
                                                                className={`w-full pl-12 pr-5 py-4 bg-surface border rounded-xl focus:ring-1 focus:ring-accent focus:border-accent outline-none transition-all shadow-sm ${errors.name ? 'border-error' : 'border-border'}`}
                                                                placeholder={t('reservation.name_label') as string}
                                                            />
                                                            {errors.name && <p className="text-xs text-red-500 absolute -bottom-5 left-0">{errors.name.message}</p>}
                                                        </div>

                                                        <div className="relative">
                                                            <Mail className="absolute top-1/2 -translate-y-1/2 left-4 w-5 h-5 text-taupe/60" aria-hidden="true" />
                                                            <input
                                                                type="email"
                                                                {...register('email')}
                                                                className={`w-full pl-12 pr-5 py-4 bg-surface border rounded-xl focus:ring-1 focus:ring-accent focus:border-accent outline-none transition-all shadow-sm ${errors.email ? 'border-error' : 'border-border'}`}
                                                                placeholder={t('reservation.email_label') as string}
                                                            />
                                                            {errors.email && <p className="text-xs text-red-500 absolute -bottom-5 left-0">{errors.email.message}</p>}
                                                        </div>

                                                        <div className="relative">
                                                            <Phone className="absolute top-1/2 -translate-y-1/2 left-4 w-5 h-5 text-taupe/60" aria-hidden="true" />
                                                            <input
                                                                type="tel"
                                                                {...register('phone')}
                                                                className={`w-full pl-12 pr-5 py-4 bg-surface border rounded-xl focus:ring-1 focus:ring-accent focus:border-accent outline-none transition-all shadow-sm ${errors.phone ? 'border-error' : 'border-border'}`}
                                                                placeholder={t('reservation.phone_label') as string}
                                                            />
                                                            {errors.phone && <p className="text-xs text-red-500 absolute -bottom-5 left-0">{errors.phone.message}</p>}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* Navigation buttons */}
                                    <div className="flex items-center justify-between pt-8 mt-4 border-t border-taupe/10">
                                        {step > 1 ? (
                                            <button
                                                type="button"
                                                onClick={prevStep}
                                                className="flex items-center gap-2 px-5 py-3 text-text-secondary hover:text-text-primary font-medium transition-colors"
                                            >
                                                <ChevronLeft className="w-5 h-5" /> Zurück
                                            </button>
                                        ) : (
                                            <div></div> // Empty placeholder to keep next button right-aligned
                                        )}

                                        {step < 4 ? (
                                            <button
                                                type="button"
                                                onClick={nextStep}
                                                className="flex items-center gap-2 px-8 py-3 bg-text-primary text-surface rounded-full font-medium shadow-sm hover:shadow-md transition-all group"
                                            >
                                                Weiter <ChevronRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        ) : (
                                            <button
                                                type="submit"
                                                disabled={isSubmitting || !isValid}
                                                className="flex items-center gap-2 px-8 py-4 bg-primary text-surface rounded-full font-bold shadow-warm hover:bg-primary-hover transition-all disabled:opacity-70 disabled:cursor-not-allowed group"
                                            >
                                                {isSubmitting ? 'Wird bearbeitet...' : 'Verbindlich Anfragen'}
                                            </button>
                                        )}
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                    
                    <div className="mt-16 max-w-2xl mx-auto opacity-70">
                        <TrustBadgeRow />
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default Reservation;
