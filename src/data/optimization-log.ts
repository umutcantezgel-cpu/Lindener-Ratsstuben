export type OptimizationEntry = {
  id: string;
  date: string;
  hypothesis: string;
  impactScore: number;
  confidenceScore: number;
  effortDays: number;
  status: 'planned' | 'testing' | 'implemented' | 'discarded';
  result?: string;
};

// Calculate ICE: (Impact * Confidence) / Effort
// Impact: 1-100 (percentage points), Confidence 0.0-1.0, Effort: 1-21 (days)

export const optimizationLog: OptimizationEntry[] = [
  {
    id: "OPT-001",
    date: "2026-04-02",
    hypothesis: "A sticky CTA on Mobile shown after 30% scroll will increase click-to-book rate by 15%.",
    impactScore: 15,
    confidenceScore: 0.8,
    effortDays: 1,
    status: "implemented",
    result: "Sticky CTA added, monitoring GA4 conversion paths."
  },
  {
    id: "OPT-002",
    date: "2026-04-05",
    hypothesis: "Personalizing the Hero headline for returning visitors will drop bounce rate by 5%.",
    impactScore: 5,
    confidenceScore: 0.6,
    effortDays: 2,
    status: "testing"
  },
  {
    id: "OPT-003",
    date: "2026-04-10",
    hypothesis: "Adding dynamic Social Proof metrics counters next to Formspree will raise summit rate by 12%.",
    impactScore: 12,
    confidenceScore: 0.7,
    effortDays: 3,
    status: "planned"
  }
];
