"use client";

import React from "react";
import { useUI } from "@/lib/context/UIContext";
import { useTranslation } from '@/lib/i18n/use-translation';

export default function ToastContainer() {
  const { toastQueue, removeToast } = useUI();
  const { t } = useTranslation('common');

  if (toastQueue.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed bottom-4 end-4 z-toast flex flex-col space-y-2 pointer-events-none"
    >
      {toastQueue.map((toast) => {
        let bgColor = "bg-status-info";
        if (toast.type === "success") bgColor = "bg-status-success";
        if (toast.type === "error") bgColor = "bg-status-error";

        return (
          <div
            key={toast.id}
            role="status"
            className={`${bgColor} px-4 py-3 rounded-md text-surface shadow-lg pointer-events-auto flex items-center justify-between min-w-[250px] animate-in fade-in slide-in-from-right-4 rtl:slide-in-from-left-4 duration-300`}
          >
            <span className="font-medium text-sm">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="ms-4 text-surface/80 hover:text-surface transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-surface rounded p-1"
              aria-label={t('aria.close') as string}
            >
              ✕
            </button>
          </div>
        );
      })}
    </div>
  );
}
