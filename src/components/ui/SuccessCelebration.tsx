import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { m as motion } from "framer-motion";
import { SPRING } from '@/lib/constants/motion';

interface SuccessCelebrationProps {
    name?: string;
    message?: string;
    nextStep?: string;
    onReset?: () => void;
    nextStepLink?: string;
    nextStepText?: string;
}

export function SuccessCelebration({
    name,
    message = "Ihre Nachricht wurde erfolgreich gesendet.",
    nextStep = "Wir prüfen Ihre Anfrage und melden uns in Kürze.",
    onReset,
    nextStepLink = "/",
    nextStepText = "Zurück zur Startseite"
}: SuccessCelebrationProps) {
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center text-center p-8 md:p-12 bg-bg-primary rounded-2xl shadow-sm border border-border"
        >
            <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ ...SPRING.fluid, delay: 0.1 }}
                className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6"
            >
                <Check className="w-10 h-10" />
            </motion.div>
            
            <motion.h3 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-display font-bold text-text-main mb-3"
            >
                Vielen Dank{name ? `, ${name}` : ''}!
            </motion.h3>
            
            <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-lg text-text-secondary mb-2"
            >
                {message}
            </motion.p>
            
            <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-sm font-medium text-primary mb-8"
            >
                {nextStep}
            </motion.p>

            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4"
            >
                <a 
                    href={nextStepLink}
                    className="interaction-bounce flex items-center gap-2 bg-bg-secondary text-text-main font-semibold px-6 py-3 rounded-lg border border-border hover:bg-surface transition-colors"
                >
                    {nextStepText}
                    <ArrowRight className="w-4 h-4" />
                </a>
                
                {onReset && (
                    <button 
                        onClick={onReset}
                        className="text-text-tertiary hover:text-text-main font-medium text-sm underline-offset-4 hover:underline"
                    >
                        Weitere Nachricht senden
                    </button>
                )}
            </motion.div>
        </motion.div>
    );
}
