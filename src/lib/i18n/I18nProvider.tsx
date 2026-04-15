"use client";

import React, { createContext, useContext, ReactNode } from 'react';
import { LocaleType } from '../locales';

interface I18nContextType {
    dictionary: Record<string, string>;
    locale: LocaleType;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ 
    children, 
    dictionary, 
    locale 
}: { 
    children: ReactNode; 
    dictionary: Record<string, string>; 
    locale: LocaleType;
}) {
    return (
        <I18nContext.Provider value={{ dictionary, locale }}>
            {children}
        </I18nContext.Provider>
    );
}

export function useI18nContext() {
    const context = useContext(I18nContext);
    if (context === undefined) {
        throw new Error('useI18nContext must be used within an I18nProvider');
    }
    return context;
}
