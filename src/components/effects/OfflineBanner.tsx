"use client";

import React, { useEffect, useState } from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';

export function OfflineBanner() {
  const isOnline = useOnlineStatus();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isOnline) {
    return null;
  }

  return (
    <div 
      className="bg-surface border-b border-border text-text-primary py-2 px-4 shadow-sm text-center text-xs tracking-wider uppercase font-medium flex items-center justify-center gap-2 animate-in slide-in-from-top fade-in duration-300 z-toast relative"
      role="alert"
    >
      <WifiOff className="w-3.5 h-3.5 text-text-secondary" />
      <span>Offline-Modus aktiv. Einige Funktionen sind eingeschränkt.</span>
    </div>
  );
}
