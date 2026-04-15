import { useState, useEffect } from 'react';

/**
 * Tracks the progress of a form based on filled required fields.
 * @param formId The ID of the form element
 * @returns { progress: number, remainingRequired: number, totalRequired: number }
 */
export function useFormProgress(formId: string) {
    const [progress, setProgress] = useState({
        percent: 0,
        remainingRequired: 0,
        totalRequired: 0,
    });

    useEffect(() => {
        const form = document.getElementById(formId) as HTMLFormElement;
        if (!form) return;

        const updateProgress = () => {
            const requiredFields = Array.from(form.querySelectorAll('[required]')) as HTMLInputElement[];
            if (requiredFields.length === 0) return;

            // Optional: Consider it "filled" if value.trim().length > 0
            const filledFields = requiredFields.filter(field => {
                if (field.type === 'checkbox' || field.type === 'radio') {
                    return field.checked;
                }
                return field.value.trim().length > 0;
            });

            setProgress({
                percent: Math.round((filledFields.length / requiredFields.length) * 100),
                remainingRequired: requiredFields.length - filledFields.length,
                totalRequired: requiredFields.length
            });
        };

        // Listen to field input events inside the form
        form.addEventListener('input', updateProgress);
        form.addEventListener('change', updateProgress);

        return () => {
            form.removeEventListener('input', updateProgress);
            form.removeEventListener('change', updateProgress);
        };
    }, [formId]);

    return progress;
}
