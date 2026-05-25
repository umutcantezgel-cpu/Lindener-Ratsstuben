"use client";

import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Calendar, Clock, MessageSquare, CheckCircle, ChevronRight, ChevronLeft, User, Phone, Mail, AlertCircle } from 'lucide-react';

import { useTranslation } from '@/lib/i18n/use-translation';
import { m as motion, AnimatePresence } from "framer-motion";
import { MorphingButton } from '@/components/ui/MorphingButton';
import { TranslationKey } from '@/lib/i18n/types';
import { SPRING } from '@/lib/constants/motion';

// ═══ HARDENED ZOD SCHEMA ═══
const reservationSchema = z.object({
    name: z.string()
        .min(2, "Bitte geben Sie Ihren Namen ein (mind. 2 Zeichen).")
        .max(80, "Name darf maximal 80 Zeichen lang sein."),
    email: z.string()
        .email("Bitte geben Sie eine gültige E-Mail-Adresse ein.")
        .max(120),
    phone: z.string()
        .min(5, "Bitte geben Sie eine gültige Telefonnummer ein.")
        .max(25)
        .regex(/^[\d\s+\-()]+$/, "Ungültiges Telefonnummernformat."),
    date: z.string()
        .min(1, "Bitte wählen Sie ein Datum.")
        .refine((val) => {
            if (!val) return false;
            const [year, month, day] = val.split('-').map(Number);
            const selected = new Date(year, month - 1, day);
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(0, 0, 0, 0);
            return selected >= tomorrow;
        }, { message: "Reservierungen sind erst ab dem morgigen Tag möglich." }),
    time: z.string()
        .min(1, "Bitte wählen Sie eine Uhrzeit.")
        .regex(/^\d{2}:\d{2}$/, "Ungültiges Zeitformat."),
    guests: z.string()
        .min(1, "Bitte wählen Sie die Gästeanzahl.")
        .refine((val) => {
            if (val === '>10') return true;
            const num = parseInt(val, 10);
            return !isNaN(num) && num >= 1 && num <= 20;
        }, { message: "Gästeanzahl muss zwischen 1 und 20 liegen." }),
    message: z.string().max(500, "Nachricht darf maximal 500 Zeichen lang sein.").optional(),
    privacy: z.literal(true, {
        errorMap: () => ({ message: "Sie müssen der Datenschutzerklärung zustimmen." })
    })
});

type ReservationData = z.infer<typeof reservationSchema>;
type FormStatus = 'idle' | 'submitting' | 'success' | 'completed' | 'error';

// ═══ HELPER: Safe translation with fallback ═══
const useSafeT = (namespace: string) => {
    const { t, locale } = useTranslation(namespace);
    const safeT = (key: string, fallback: string): string => {
        const result = t(key as TranslationKey);
        return (result && result !== '') ? String(result) : fallback;
    };
    return { safeT, locale };
};

export const ReservationInteractive = () => {
    const [step, setStep] = useState(1);
    const [formStatus, setFormStatus] = useState<FormStatus>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const formStartTime = useRef<number>(Date.now());
    const { safeT: t } = useSafeT('forms');
    const { safeT: tPages } = useSafeT('pages');

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
        defaultValues: { guests: '2', message: '', privacy: undefined },
        mode: 'onChange'
    });

    const onSubmit = (data: ReservationData) => {
        // ═══ BOT DETECTION: Time-To-Complete Check ═══
        const elapsed = Date.now() - formStartTime.current;
        if (elapsed < 3000) {
            console.warn('[Spam Guard] Submission too fast, likely a bot.');
            setFormStatus('success');
            return;
        }

        // ═══ HONEYPOT CHECK ═══
        const honeypotField = document.querySelector<HTMLInputElement>('input[name="_honeypot_address"]');
        if (honeypotField && honeypotField.value.length > 0) {
            console.warn('[Spam Guard] Honeypot triggered.');
            setFormStatus('success');
            return;
        }

        // --- Optimistic UI Execution ---
        setFormStatus('submitting');
        setErrorMessage('');
        
        // Morphing animation delay
        setTimeout(() => {
            setFormStatus('success');
            setTimeout(() => {
                setFormStatus('completed');
            }, 800);
        }, 600);

        const endpoint = `/api/reservation`;
        const payload = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            date: data.date,
            time: data.time,
            guests: data.guests,
            message: data.message || '',
        };

        const fallbackQueue = JSON.parse(localStorage.getItem('form_retry_queue') || '[]');

        if (!navigator.onLine) {
            fallbackQueue.push({ type: 'reservation', data: payload, timestamp: Date.now() });
            localStorage.setItem('form_retry_queue', JSON.stringify(fallbackQueue));
            reset();
            setStep(1);
            return;
        }

        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(payload),
        }).then(response => {
            if (!response.ok) {
                // Background failure - Add to queue
                fallbackQueue.push({ type: 'reservation', data: payload, timestamp: Date.now() });
                localStorage.setItem('form_retry_queue', JSON.stringify(fallbackQueue));
            }
        }).catch(() => {
            // Network failure - Add to queue
            fallbackQueue.push({ type: 'reservation', data: payload, timestamp: Date.now() });
            localStorage.setItem('form_retry_queue', JSON.stringify(fallbackQueue));
        });

        // Reset form state in the background to be ready for next interaction
        reset();
        setStep(1);
    };

    const nextStep = async () => {
        let valid = false;
        if (step === 1) valid = await trigger('guests');
        if (step === 2) valid = await trigger(['date', 'time']);
        if (step === 3) valid = true;
        if (valid) setStep(s => Math.min(s + 1, 4));
    };

    const prevStep = () => setStep(s => Math.max(s - 1, 1));

    const guests = watch('guests');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const y = tomorrow.getFullYear();
    const m = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const d = String(tomorrow.getDate()).padStart(2, '0');
    const tomorrowStr = `${y}-${m}-${d}`;

    const stepVariants = {
        hidden: { opacity: 0, x: 20, filter: 'blur(4px)' },
        visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
        exit: { opacity: 0, x: -20, filter: 'blur(4px)' }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-display font-medium text-onyx mb-4 tracking-tight">
                    {t('reservation.title', 'Tisch reservieren')}
                </h1>
                <p className="text-onyx-muted text-lg max-w-xl mx-auto">
                    {tPages('reservation.subtitle', 'Sichern Sie sich Ihren Tisch für ein unvergessliches Erlebnis.')}
                </p>
            </div>

            <div className="bg-bg-primary rounded-2xl shadow-warm p-8 md:p-12 overflow-hidden relative">
                <AnimatePresence mode="wait">
                    {formStatus === 'completed' ? (
                        <motion.div 
                            key="success-view"
                            initial={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
                            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
                            transition={SPRING.fluid}
                            className="text-center py-12"
                        >
                            <div className="w-24 h-24 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-8">
                                <CheckCircle className="w-12 h-12" aria-hidden="true" />
                            </div>
                            <h2 className="text-3xl font-display font-medium text-onyx mb-4 tracking-wide">
                                {t('reservation.success_title', 'Vielen Dank!')}
                            </h2>
                            <p className="text-onyx-muted text-lg mb-10 max-w-md mx-auto leading-relaxed">
                                {t('reservation.success_message', 'Wir haben Ihre Anfrage erhalten und melden uns in Kürze bei Ihnen.')}
                            </p>
                            <button
                                onClick={() => { setFormStatus('idle'); formStartTime.current = Date.now(); }}
                                className="text-accent border-b border-accent/30 pb-1 hover:border-accent font-medium transition-all"
                            >
                                {t('reservation.new_reservation', 'Neue Reservierung')}
                            </button>
                        </motion.div>
                    ) : (
                        <motion.form 
                            key="form-view"
                            initial={{ opacity: 0, filter: 'blur(4px)' }}
                            animate={{ opacity: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, filter: 'blur(4px)' }}
                            transition={SPRING.fluid}
                            onSubmit={handleSubmit(onSubmit)} 
                            className="space-y-8" 
                            noValidate
                        >
                        {/* Progress indicator */}
                        <div className="flex justify-between items-center mb-10 relative">
                            <div className="absolute start-0 top-1/2 -mt-px w-full h-[2px] bg-taupe/20 -z-10"></div>
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

                        {/* ═══ HONEYPOT (invisible to humans) ═══ */}
                        <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }}>
                            <label htmlFor="honeypot-address">Bitte leer lassen</label>
                            <input type="text" id="honeypot-address" name="_honeypot_address" tabIndex={-1} autoComplete="off" />
                        </div>

                        {/* Error Banner */}
                        {formStatus === 'error' && errorMessage && (
                            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-red-800 text-sm font-medium">{errorMessage}</p>
                                    <p className="text-red-600 text-xs mt-1">
                                        {t('reservation.call_alternative', 'Alternativ erreichen Sie uns telefonisch unter 06403 - 64556')}
                                    </p>
                                </div>
                            </motion.div>
                        )}

                        <div className="min-h-[220px]">
                            <AnimatePresence mode="wait">
                                {step === 1 && (
                                    <motion.div key="step1" variants={stepVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.4 }} className="space-y-6">
                                        <div className="text-center mb-8">
                                            <h2 className="text-2xl font-display font-medium text-onyx mb-2">
                                                {t('reservation.step1_title', 'Für wie viele Personen?')}
                                            </h2>
                                            <p className="text-onyx-muted text-sm">{t('reservation.step1_subtitle', 'Bitte wählen Sie die Gästeanzahl')}</p>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                                                <button key={num} type="button"
                                                    onClick={() => { setValue('guests', num.toString(), { shouldValidate: true }); setTimeout(nextStep, 300); }}
                                                    className={`py-4 px-4 rounded-xl text-lg font-medium transition-all duration-300 border
                                                        ${guests === num.toString() ? 'bg-primary border-primary text-surface shadow-warm' : 'bg-surface text-text-primary border-border hover:border-primary/40 hover:bg-bg-secondary'}`}
                                                >
                                                    {num} <span className="text-sm font-normal opacity-80">{num === 1 ? t('reservation.person_singular', 'Person') : t('reservation.person_plural', 'Personen')}</span>
                                                </button>
                                            ))}
                                        </div>
                                        <div className="mt-4">
                                            <label htmlFor="res-guests" className="sr-only">{t('reservation.more_guests', 'Weitere Optionen')}</label>
                                            <select id="res-guests" {...register('guests')}
                                                onChange={(e) => { setValue('guests', e.target.value, { shouldValidate: true }); if(e.target.value !== '') setTimeout(nextStep, 300); }}
                                                className="w-full px-5 py-4 bg-surface border border-border rounded-xl focus:ring-1 focus:ring-accent focus:border-accent outline-none text-text-primary transition-all appearance-none text-center cursor-pointer hover:bg-bg-secondary"
                                            >
                                                <option value="" disabled>{t('reservation.larger_groups', 'Größere Gesellschaften?')}</option>
                                                <option value="9">9 {t('reservation.person_plural', 'Personen')}</option>
                                                <option value="10">10 {t('reservation.person_plural', 'Personen')}</option>
                                                <option value=">10">{t('reservation.more_than_10', 'Mehr als 10 Personen')}</option>
                                            </select>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div key="step2" variants={stepVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.4 }} className="space-y-6">
                                        <div className="text-center mb-8">
                                            <h2 className="text-2xl font-display font-medium text-onyx mb-2">{t('reservation.step2_title', 'Wann dürfen wir Sie erwarten?')}</h2>
                                            <p className="text-onyx-muted text-sm">{t('reservation.step2_subtitle', 'Datum und Uhrzeit Ihrer Wahl')}</p>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label htmlFor="res-date" className="block text-sm font-medium text-onyx flex items-center gap-2">
                                                    <Calendar className="w-4 h-4 text-accent" aria-hidden="true" /> {t('reservation.date_label', 'Datum')}
                                                </label>
                                                <input id="res-date" type="date" min={tomorrowStr} {...register('date')}
                                                    className={`w-full px-5 py-4 bg-surface border rounded-xl focus:ring-1 focus:ring-accent focus:border-accent outline-none transition-all shadow-sm ${errors.date ? 'border-red-400' : 'border-border'}`}
                                                />
                                                {errors.date && <p className="text-xs text-red-500 flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" /> {errors.date.message}</p>}
                                            </div>
                                            <div className="space-y-2">
                                                <label htmlFor="res-time" className="block text-sm font-medium text-onyx flex items-center gap-2">
                                                    <Clock className="w-4 h-4 text-accent" aria-hidden="true" /> {t('reservation.time_label', 'Uhrzeit')}
                                                </label>
                                                <input id="res-time" type="time" {...register('time')}
                                                    className={`w-full px-5 py-4 bg-surface border rounded-xl focus:ring-1 focus:ring-accent focus:border-accent outline-none transition-all shadow-sm ${errors.time ? 'border-red-400' : 'border-border'}`}
                                                />
                                                {errors.time && <p className="text-xs text-red-500 flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" /> {errors.time.message}</p>}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 3 && (
                                    <motion.div key="step3" variants={stepVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.4 }} className="space-y-6">
                                        <div className="text-center mb-8">
                                            <h2 className="text-2xl font-display font-medium text-text-primary mb-2">{t('reservation.step3_title', 'Gibt es einen besonderen Anlass?')}</h2>
                                            <p className="text-text-secondary text-sm">{t('reservation.step3_subtitle', 'Teilen Sie uns eventuelle Wünsche mit (Optional)')}</p>
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="res-message" className="sr-only">{t('reservation.wishes_label', 'Besondere Wünsche')}</label>
                                            <div className="relative">
                                                <MessageSquare className="absolute top-4 start-4 w-5 h-5 text-taupe/60" aria-hidden="true" />
                                                <textarea id="res-message" rows={4} maxLength={500} {...register('message')}
                                                    className="w-full ps-12 pe-5 py-4 bg-surface border border-border rounded-xl focus:ring-1 focus:ring-accent focus:border-accent outline-none transition-all shadow-sm resize-none"
                                                    placeholder={t('reservation.wishes_placeholder', 'z.B. Hochzeitstag, Allergien, ruhiger Tisch erwünscht...')}
                                                ></textarea>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 4 && (
                                    <motion.div key="step4" variants={stepVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.4 }} className="space-y-6">
                                        <div className="text-center mb-8">
                                            <h2 className="text-2xl font-display font-medium text-text-primary mb-2">{t('reservation.step4_title', 'Ihre Kontaktdaten')}</h2>
                                            <p className="text-text-secondary text-sm">{t('reservation.step4_subtitle', 'Um Ihnen die Bestätigung senden zu können')}</p>
                                        </div>
                                        <div className="space-y-5">
                                            <div className="relative">
                                                <User className="absolute top-1/2 -translate-y-1/2 start-4 w-5 h-5 text-taupe/60" aria-hidden="true" />
                                                <input type="text" {...register('name')}
                                                    className={`w-full ps-12 pe-5 py-4 bg-surface border rounded-xl focus:ring-1 focus:ring-accent focus:border-accent outline-none transition-all shadow-sm ${errors.name ? 'border-red-400' : 'border-border'}`}
                                                    placeholder={t('reservation.name_label', 'Ihr Name')}
                                                />
                                                {errors.name && <p className="text-xs text-red-500 absolute -bottom-5 start-0 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.name.message}</p>}
                                            </div>
                                            <div className="relative">
                                                <Mail className="absolute top-1/2 -translate-y-1/2 start-4 w-5 h-5 text-taupe/60" aria-hidden="true" />
                                                <input type="email" {...register('email')}
                                                    className={`w-full ps-12 pe-5 py-4 bg-surface border rounded-xl focus:ring-1 focus:ring-accent focus:border-accent outline-none transition-all shadow-sm ${errors.email ? 'border-red-400' : 'border-border'}`}
                                                    placeholder={t('reservation.email_label', 'Ihre E-Mail')}
                                                />
                                                {errors.email && <p className="text-xs text-red-500 absolute -bottom-5 start-0 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email.message}</p>}
                                            </div>
                                            <div className="relative">
                                                <Phone className="absolute top-1/2 -translate-y-1/2 start-4 w-5 h-5 text-taupe/60" aria-hidden="true" />
                                                <input type="tel" {...register('phone')}
                                                    className={`w-full ps-12 pe-5 py-4 bg-surface border rounded-xl focus:ring-1 focus:ring-accent focus:border-accent outline-none transition-all shadow-sm ${errors.phone ? 'border-red-400' : 'border-border'}`}
                                                    placeholder={t('reservation.phone_label', 'Ihre Telefonnummer')}
                                                />
                                                {errors.phone && <p className="text-xs text-red-500 absolute -bottom-5 start-0 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.phone.message}</p>}
                                            </div>
                                            
                                            <div className="flex items-start gap-3 mt-6 pt-4 border-t border-taupe/10">
                                                <div className="flex items-center h-5 mt-0.5">
                                                    <input
                                                        id="res-privacy"
                                                        type="checkbox"
                                                        {...register('privacy')}
                                                        className="w-4 h-4 text-accent bg-surface border-border rounded focus:ring-accent focus:ring-2 cursor-pointer"
                                                    />
                                                </div>
                                                <div className="text-sm">
                                                    <label htmlFor="res-privacy" className="font-medium text-text-primary cursor-pointer">Datenschutz <span className="text-red-500">*</span></label>
                                                    <p className="text-text-secondary text-xs mt-1">
                                                        Ich habe die <a href={`/${locale}/datenschutz`} className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">Datenschutzerklärung</a> zur Kenntnis genommen und stimme zu, dass meine Daten zwecks Bearbeitung gespeichert werden.
                                                    </p>
                                                    {errors.privacy && <p className="text-xs text-red-500 flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" />{errors.privacy.message}</p>}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Navigation buttons */}
                        <div className="flex items-center justify-between pt-8 mt-4 border-t border-taupe/10">
                            {step > 1 ? (
                                <button type="button" onClick={prevStep} className="flex items-center gap-2 px-5 py-3 text-text-secondary hover:text-text-primary font-medium transition-colors">
                                    <ChevronLeft className="w-5 h-5" /> {t('reservation.back', 'Zurück')}
                                </button>
                            ) : <div></div>}

                            {step < 4 ? (
                                <button type="button" onClick={nextStep} className="flex items-center gap-2 px-8 py-3 bg-text-primary text-surface rounded-full font-medium shadow-sm hover:shadow-md transition-all group">
                                    {t('reservation.next', 'Weiter')} <ChevronRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                                </button>
                            ) : (
                                <MorphingButton 
                                    type="submit" 
                                    disabled={formStatus === 'submitting' || formStatus === 'success' || !isValid}
                                    state={formStatus === 'submitting' ? 'loading' : formStatus === 'success' ? 'success' : 'idle'}
                                    idleText={t('reservation.submit', 'Verbindlich Anfragen')}
                                    loadingText={t('reservation.submitting', 'Wird bearbeitet...')}
                                    successText={t('reservation.success_short', 'Gesendet!')}
                                    className="px-8 rounded-full shadow-warm"
                                />
                            )}
                        </div>
                        </motion.form>
                    )}
                </AnimatePresence>
            </div>

            {/* Sticky Mobile Summary Bar */}
            {step > 1 && formStatus !== 'completed' && formStatus !== 'success' && (
                <div className="fixed bottom-0 left-0 right-0 bg-surface/90 backdrop-blur-md border-t border-border p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] md:hidden z-40 transform transition-transform duration-300">
                    <div className="flex justify-between items-center max-w-2xl mx-auto px-2">
                        <div className="flex flex-col">
                            <span className="text-xs font-medium text-text-secondary uppercase tracking-wider">{t('reservation.summary_title', 'Ihre Auswahl')}</span>
                            <div className="flex items-center gap-2 text-sm font-semibold text-text-primary mt-1">
                                <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-accent" /> {guests}</span>
                                {watch('date') && (
                                    <>
                                        <span className="text-taupe/40">•</span>
                                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-accent" /> {new Date(watch('date')).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' })}</span>
                                    </>
                                )}
                                {watch('time') && (
                                    <>
                                        <span className="text-taupe/40">•</span>
                                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-accent" /> {watch('time')}</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};
