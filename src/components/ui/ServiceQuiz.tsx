"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const questions = [
  { question: "Was ist Ihr primäres Ziel?", options: ["Mehr Leads", "Modernes Design", "Automatisierung", "Besseres Ranking"] },
  { question: "Wie schnell benötigen Sie das Projekt?", options: ["ASAP", "1 Monat", "3 Monate", "Kein Stress"] },
  { question: "Wer ist Ihre Zielgruppe?", options: ["B2B Mittelstand", "B2C Consumer", "Startups", "Corporate"] },
];

export function ServiceQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsFinished(true);
    }
  };

  const getRecommendation = () => {
    // Basic logic mapping
    if (answers.includes("Mehr Leads") || answers.includes("Besseres Ranking")) return "SEO & Performance Optimization";
    if (answers.includes("Automatisierung")) return "Custom Web Application";
    return "Website Redesign & Branding";
  };

  if (isFinished) {
    const rec = getRecommendation();
    return (
      <div className="bg-bg-secondary border border-border p-8 rounded-xl text-center text-text-primary max-w-lg mx-auto">
        <h3 className="text-2xl font-bold mb-2">Unser Experte empfiehlt:</h3>
        <p className="text-primary text-xl font-medium mb-6">{rec}</p>
        <p className="text-text-secondary mb-8">Basierend auf Ihren Angaben ist dies der direkteste Weg zum Erfolg.</p>
        <Link href={`/reservation?service=${encodeURIComponent(rec)}`} className="bg-primary text-surface px-8 py-3 rounded-full hover:bg-primary-hover transition">
          Kostenfreie Beratung buchen
        </Link>
      </div>
    );
  }

  const q = questions[currentStep];

  return (
    <div className="bg-bg-secondary border border-border p-8 rounded-xl text-text-primary max-w-lg mx-auto">
      <div className="text-sm font-medium text-text-tertiary mb-4">Frage {currentStep + 1} von {questions.length}</div>
      <h3 className="text-xl font-semibold mb-6">{q.question}</h3>
      <div className="flex flex-col gap-3">
        {q.options.map((opt, i) => (
          <button 
            key={i} 
            onClick={() => handleAnswer(opt)}
            className="w-full text-left px-5 py-4 bg-surface hover:bg-bg-secondary border border-border hover:border-primary rounded-lg transition"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
