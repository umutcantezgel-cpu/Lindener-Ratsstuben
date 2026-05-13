"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { SuccessCelebration } from '../ui/SuccessCelebration';
import { TrustSignals } from '../ui/TrustSignals';
import { useFormProgress } from '@/hooks/useFormProgress';
import { useTranslation } from '@/lib/i18n/use-translation';
import { MorphingButton, ButtonState } from '../ui/MorphingButton';
import { m as motion, AnimatePresence } from "framer-motion";
import { EASING } from '@/lib/constants/motion';

export function ContactForm() {
    const [cooldown, setCooldown] = useState(0);
    const [offlineWarning, setOfflineWarning] = useState(false);
    const [serverError, setServerError] = useState(false);
    const { t } = useTranslation('common');

    // Dynamic validation with translated messages
    const contactSchema = z.object({
        name: z.string().min(2, t('form.name_required') as string),
        email: z.string().email(t('form.email_required') as string),
        subject: z.string().min(1, t('form.subject_required') as string),
        message: z.string().min(10, t('form.message_min') as string),
        privacy: z.literal(true, {
            message: t('form.privacy_required') as string,
        }),
    });

    type ContactFormData = z.infer<typeof contactSchema>;
    
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        watch,
        reset,
        setFocus
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        mode: 'onChange'
    });

    // We can use the useFormProgress hook to show progress. We must give the form an ID.
    const progress = useFormProgress("main-contact-form");

    const [optimisticSuccess, setOptimisticSuccess] = useState(false);
    const [buttonState, setButtonState] = useState<ButtonState>('idle');

    // Autosave Logic (sessionStorage)
    useEffect(() => {
        const savedData = sessionStorage.getItem('contact_form_autosave');
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);
                // Don't restore if already submitted successfully to avoid confusion
                if (!optimisticSuccess) reset(parsed);
            } catch (e) {
                console.error("Autosave restore parsing error", e);
            }
        }
    }, [reset, optimisticSuccess]);

    useEffect(() => {
        const subscription = watch((value) => {
            if (Object.keys(value).length > 0) {
                sessionStorage.setItem('contact_form_autosave', JSON.stringify(value));
            }
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    useEffect(() => {
        if (cooldown > 0) {
            const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [cooldown]);

    useEffect(() => {
        // Automatically focus first field with error
        const firstErrorPath = Object.keys(errors)[0] as keyof ContactFormData;
        if (firstErrorPath) {
            setFocus(firstErrorPath);
        }
    }, [errors, setFocus]);

    const formStartTime = useRef<number>(Date.now());

    const onSubmit = async (data: ContactFormData) => {
        // ═══ BOT DETECTION: Time-To-Complete Check ═══
        const elapsed = Date.now() - formStartTime.current;
        if (elapsed < 3000) {
            console.warn('[Spam Guard] Submission too fast, likely a bot.');
            setButtonState('success');
            setTimeout(() => {
                setOptimisticSuccess(true);
                setCooldown(30);
                sessionStorage.removeItem('contact_form_autosave');
                setButtonState('idle');
            }, 1000);
            return;
        }

        // ═══ HONEYPOT CHECK ═══
        const honeypotField = document.querySelector<HTMLInputElement>('input[name="_honeypot"]');
        if (honeypotField && honeypotField.value.length > 0) {
            console.warn('[Spam Guard] Honeypot triggered.');
            setButtonState('success');
            setTimeout(() => {
                setOptimisticSuccess(true);
                setCooldown(30);
                sessionStorage.removeItem('contact_form_autosave');
                setButtonState('idle');
            }, 1000);
            return;
        }

        setButtonState('loading');
        setServerError(false);

        // Store & Forward preparation
        const fallbackQueue = JSON.parse(localStorage.getItem('form_retry_queue') || '[]');
        
        if (!navigator.onLine) {
            setOfflineWarning(true);
            // Add to background queue
            fallbackQueue.push({ type: 'contact', data, timestamp: Date.now() });
            localStorage.setItem('form_retry_queue', JSON.stringify(fallbackQueue));
            // Still show optimistic success
            setButtonState('success');
            setTimeout(() => {
                setOptimisticSuccess(true);
                setCooldown(30);
                sessionStorage.removeItem('contact_form_autosave');
                setButtonState('idle');
            }, 1000);
            return;
        }

        setOfflineWarning(false);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    subject: data.subject,
                    message: data.message,
                }),
            });

            if (!response.ok) {
                throw new Error(`Server responded with ${response.status}`);
            }

            // Success
            setButtonState('success');
            setTimeout(() => {
                setOptimisticSuccess(true);
                setCooldown(30);
                sessionStorage.removeItem('contact_form_autosave');
                setButtonState('idle');
            }, 1000);
        } catch (error) {
            console.error('[ContactForm] Submission error:', error);
            
            // Queue for retry
            fallbackQueue.push({ type: 'contact', data, timestamp: Date.now() });
            localStorage.setItem('form_retry_queue', JSON.stringify(fallbackQueue));
            
            // Still show success to user (optimistic) — the retry queue will handle it
            setButtonState('success');
            setTimeout(() => {
                setOptimisticSuccess(true);
                setCooldown(30);
                sessionStorage.removeItem('contact_form_autosave');
                setButtonState('idle');
            }, 1000);
        }
    };

    return (
        <div className="relative">
            {/* Progress Indicator */}
            {progress.percent > 0 && progress.percent < 100 && (
                <div className="absolute -top-12 inset-x-0 p-3 bg-blue-50 text-blue-800 text-sm font-medium rounded-lg text-center animate-fade-in border border-blue-100">
                    {(t('form.almost_done') as string).replace('{count}', String(progress.remainingRequired))}
                </div>
            )}

            <AnimatePresence mode="wait">
                {(optimisticSuccess && cooldown > 0) ? (
                    <motion.div
                        key="success-view"
                        initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                        transition={{ duration: 0.4, ease: EASING.fluid }}
                    >
                        <SuccessCelebration 
                            name={watch("name")} 
                            message={t('success.message') as string}
                            nextStep={t('success.next_step') as string}
                            nextStepLink="/menu"
                            nextStepText={t('success.to_menu') as string}
                            onReset={() => {
                                setOptimisticSuccess(false);
                                reset();
                                window.location.reload(); 
                            }}
                        />
                    </motion.div>
                ) : (
                    <motion.form 
                        key="form-view"
                        initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                        transition={{ duration: 0.4, ease: EASING.fluid }}
                        id="main-contact-form"
                        onSubmit={handleSubmit(onSubmit)} 
                        className="space-y-6"
                    >
                {/* Honeypot field (hidden from real users) */}
                <input type="text" name="_honeypot" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                <div>
                    <label className="block text-sm font-medium text-text-primary mb-1" htmlFor="name">{t('contact.name_label') as string}</label>
                    <input
                        id="name"
                        type="text"
                        {...register("name")}
                        className={`w-full min-h-[48px] px-4 py-3 border ${errors.name ? 'border-status-error focus:ring-status-error' : 'border-border focus:ring-primary'} rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all`}
                        placeholder={t('form.your_name') as string}
                        autoComplete="name"
                        aria-invalid={errors.name ? "true" : "false"}
                        aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name && (
                        <p id="name-error" className="text-status-error text-sm mt-1.5 flex items-center gap-1.5 font-medium" role="alert">
                            <AlertCircle className="w-4 h-4 shrink-0" /> {errors.name.message}
                        </p>
                    )}
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-text-primary mb-1" htmlFor="email">{t('contact.email_label') as string}</label>
                    <input
                        id="email"
                        type="email"
                        {...register("email")}
                        className={`w-full min-h-[48px] px-4 py-3 border ${errors.email ? 'border-status-error focus:ring-status-error' : 'border-border focus:ring-primary'} rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all`}
                        placeholder={t('form.email_placeholder') as string}
                        autoComplete="email"
                        aria-invalid={errors.email ? "true" : "false"}
                        aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && (
                        <p id="email-error" className="text-status-error text-sm mt-1.5 flex items-center gap-1.5 font-medium" role="alert">
                            <AlertCircle className="w-4 h-4 shrink-0" /> {errors.email.message}
                        </p>
                    )}
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-text-primary mb-1" htmlFor="subject">{t('form.subject') as string}</label>
                    <select
                        id="subject"
                        {...register("subject")}
                        className="w-full min-h-[48px] px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-surface"
                        aria-invalid={errors.subject ? "true" : "false"}
                        aria-describedby={errors.subject ? "subject-error" : undefined}
                    >
                        <option value="">{t('form.select_option') as string}</option>
                        <option value="Tischreservierung">{t('form.table_reservation') as string}</option>
                        <option value="Catering">{t('form.catering') as string}</option>
                        <option value="Feedback">{t('form.feedback') as string}</option>
                        <option value="Sonstiges">{t('form.other') as string}</option>
                    </select>
                    {errors.subject && (
                        <p id="subject-error" className="text-status-error text-sm mt-1.5 flex items-center gap-1.5 font-medium" role="alert">
                            <AlertCircle className="w-4 h-4 shrink-0" /> {errors.subject.message}
                        </p>
                    )}
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-text-primary mb-1" htmlFor="message">{t('form.message') as string}</label>
                    <textarea
                        id="message"
                        {...register("message")}
                        rows={4}
                        className={`w-full min-h-[48px] px-4 py-3 border ${errors.message ? 'border-status-error focus:ring-status-error' : 'border-border focus:ring-primary'} rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all`}
                        placeholder={t('form.message_placeholder') as string}
                        aria-invalid={errors.message ? "true" : "false"}
                        aria-describedby={errors.message ? "message-error" : undefined}
                    ></textarea>
                    {errors.message && (
                        <p id="message-error" className="text-status-error text-sm mt-1.5 flex items-center gap-1.5 font-medium" role="alert">
                            <AlertCircle className="w-4 h-4 shrink-0" /> {errors.message.message}
                        </p>
                    )}
                </div>
                
                <div className="flex items-start gap-3 p-4 bg-bg-secondary rounded-lg border border-border">
                    <input 
                        type="checkbox" 
                        id="privacy" 
                        {...register("privacy")}
                        aria-invalid={errors.privacy ? "true" : "false"}
                        aria-describedby={errors.privacy ? "privacy-error" : undefined}
                        className="mt-1 w-4 h-4 text-primary focus:ring-primary border-border rounded" 
                    />
                    <div>
                        <label htmlFor="privacy" className="text-[15px] leading-relaxed text-text-secondary cursor-pointer block min-h-[44px] py-1">
                            {(t('form.privacy_consent') as string).split('{link}')[0]}
                            <Link href="/datenschutz" className="text-primary hover:text-primary-hover underline underline-offset-2">
                                {t('form.privacy_link_text') as string}
                            </Link>
                            {(t('form.privacy_consent') as string).includes('{link}') ? (t('form.privacy_consent') as string).split('{link}')[1] || '' : ''}
                        </label>
                        {errors.privacy && (
                            <p id="privacy-error" className="text-status-error text-sm mt-1 flex items-center gap-1.5 font-medium" role="alert">
                                <AlertCircle className="w-4 h-4 shrink-0" /> {errors.privacy.message}
                            </p>
                        )}
                    </div>
                </div>

                {offlineWarning && (
                    <div className="p-4 bg-status-warning/10 text-status-warning rounded-lg text-sm border border-status-warning/20 font-medium" role="alert">
                        {t('form.offline_warning') as string}
                    </div>
                )}

                {serverError && (
                    <div className="p-4 bg-status-error/10 text-status-error rounded-lg text-sm border border-status-error/20 font-medium" role="alert">
                        {t('form.server_error') as string}
                    </div>
                )}

                <div className="pt-2">
                    <MorphingButton
                        type="submit"
                        disabled={buttonState === 'loading' || !isValid || cooldown > 0}
                        state={buttonState}
                        idleText={cooldown > 0 ? (t('status.sent_pause') as string).replace('{seconds}', String(cooldown)) : (t('form.send_free') as string)}
                        loadingText={t('status.sending') as string}
                        successText="Gesendet!"
                    />
                    
                    <div className="flex justify-center gap-4 mt-4">
                        <TrustSignals type="security" text={t('form.trust_gdpr') as string} />
                        <TrustSignals type="bullet" text={t('form.trust_response') as string} />
                    </div>
                </div>
            </motion.form>
                )}
            </AnimatePresence>
        </div>
    );
}
