"use client";
import React from 'react';

export const PageTransition = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full animate-in fade-in duration-500">
            {children}
        </div>
    );
};
