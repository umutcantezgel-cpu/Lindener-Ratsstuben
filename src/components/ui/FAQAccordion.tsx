'use client';

import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  /** The question text */
  question: string;
  /** The answer text (supports multi-line) */
  answer: string;
}

interface FAQAccordionProps {
  /** Array of FAQ items to display */
  items: FAQItem[];
  /** Allow multiple items open simultaneously */
  allowMultiple?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Interactive FAQ accordion with smooth open/close animations.
 * Client Component — manages open/close state per item.
 * WCAG AAA: Keyboard-navigable, aria-expanded, aria-controls.
 */
export function FAQAccordion({
  items,
  allowMultiple = false,
  className,
}: FAQAccordionProps) {
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set());

  const toggle = useCallback(
    (index: number) => {
      setOpenIndices((prev) => {
        const next = new Set(prev);
        if (next.has(index)) {
          next.delete(index);
        } else {
          if (!allowMultiple) {
            next.clear();
          }
          next.add(index);
        }
        return next;
      });
    },
    [allowMultiple]
  );

  return (
    <div className={cn('divide-y divide-border', className)}>
      {items.map((item, index) => {
        const isOpen = openIndices.has(index);
        const panelId = `faq-panel-${index}`;
        const headerId = `faq-header-${index}`;

        return (
          <div key={index} className="group">
            <button
              id={headerId}
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="w-full flex items-center justify-between py-5 text-left transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg"
            >
              <span className="text-base font-semibold text-text-primary pr-4">
                {item.question}
              </span>
              <ChevronDown
                className={cn(
                  'w-5 h-5 text-text-tertiary flex-shrink-0 transition-transform duration-300',
                  isOpen && 'rotate-180 text-primary'
                )}
                aria-hidden="true"
              />
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              className={cn(
                'overflow-hidden transition-all duration-300 ease-in-out',
                isOpen ? 'max-h-96 opacity-100 pb-5' : 'max-h-0 opacity-0'
              )}
            >
              <p className="text-text-secondary leading-relaxed pl-0.5">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
