"use client";

import { useEffect, useState, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PrintOnlyPortalProps {
  children: ReactNode;
}

export function PrintOnlyPortal({ children }: PrintOnlyPortalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="print-portal-root" aria-hidden="true">
      {children}
    </div>,
    document.body
  );
}
