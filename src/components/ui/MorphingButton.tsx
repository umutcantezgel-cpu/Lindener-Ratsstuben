"use client";

import React from 'react';
import { motion, AnimatePresence, HTMLMotionProps } from 'framer-motion';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SPRING } from '@/lib/constants/motion';

export type ButtonState = 'idle' | 'loading' | 'success';

interface MorphingButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
    state: ButtonState;
    idleText: string;
    loadingText?: string;
    successText?: string;
}

export function MorphingButton({
    state,
    idleText,
    loadingText = 'Wird gesendet...',
    successText = 'Erfolgreich',
    className,
    disabled,
    ...props
}: MorphingButtonProps) {
    const isPending = state === 'loading';
    const isSuccess = state === 'success';

    return (
        <motion.button
            layout
            {...props}
            disabled={disabled || isPending || isSuccess}
            className={cn(
                "relative overflow-hidden w-full min-h-[56px] py-4 px-6 font-bold rounded-xl flex items-center justify-center gap-2 transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed",
                isSuccess 
                    ? "bg-status-success text-surface hover:bg-status-success/90" 
                    : "bg-primary text-surface hover:bg-primary-hover",
                className
            )}
            initial={false}
            animate={{
                width: isSuccess ? '100%' : '100%',
            }}
            whileHover={!disabled && !isPending && !isSuccess ? { scale: 1.02 } : {}}
            whileTap={!disabled && !isPending && !isSuccess ? { scale: 0.98 } : {}}
        >
            <AnimatePresence mode="popLayout" initial={false}>
                {isSuccess ? (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 15, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -15, scale: 0.8 }}
                        transition={SPRING.fluid}
                        className="flex items-center gap-2"
                    >
                        <CheckCircle2 className="w-5 h-5" />
                        <span>{successText}</span>
                    </motion.div>
                ) : isPending ? (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0, y: 15, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -15, scale: 0.8 }}
                        transition={SPRING.fluid}
                        className="flex items-center gap-2"
                    >
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>{loadingText}</span>
                    </motion.div>
                ) : (
                    <motion.div
                        key="idle"
                        initial={{ opacity: 0, y: 15, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -15, scale: 0.8 }}
                        transition={SPRING.fluid}
                        className="flex items-center gap-2"
                    >
                        <span>{idleText}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    );
}
