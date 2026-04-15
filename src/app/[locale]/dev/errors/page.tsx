"use client";

import React, { useEffect, useState } from 'react';

type AggregateError = {
  message: string;
  count: number;
  lastSeen: string;
  level: string;
  category: string;
  page: string;
  stack?: string;
};

export default function DevErrorsDashboard() {
  const [errors, setErrors] = useState<AggregateError[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchErrors = async () => {
    try {
      const res = await fetch('/api/monitoring/errors');
      if (res.ok) {
        const data = await res.json();
        const sorted = data.sort((a: AggregateError, b: AggregateError) => b.count - a.count);
        setErrors(sorted);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchErrors();
    const interval = setInterval(fetchErrors, 30000); // 30s auto-refresh
    return () => clearInterval(interval);
  }, []);

  if (process.env.NODE_ENV === 'production') {
    return <div className="p-12 text-center text-red-500 font-bold">Unauthorized. Route is Dev/Staging only.</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
          <h1 className="text-3xl font-bold text-white">Client Error Dashboard (Local/Dev)</h1>
          <button 
            onClick={fetchErrors}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium transition"
          >
            Refresh
          </button>
        </header>

        {loading ? (
          <div className="text-center py-12 text-slate-500">Loading metrics...</div>
        ) : errors.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-slate-800 rounded-xl bg-slate-900/50">
            <span className="text-4xl block mb-4">🎉</span>
            <p className="text-lg text-emerald-400 font-medium">Zero Errors in Memory Buffer</p>
            <p className="text-sm mt-2">All client boundaries and networking seem healthy.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {errors.map((error, idx) => (
              <details key={idx} className="group bg-slate-900 border border-slate-800 rounded-lg p-6">
                <summary className="cursor-pointer list-none flex items-start gap-4">
                  <span className={`px-3 py-1 rounded text-xs font-bold uppercase mt-1 ${
                    error.level === 'fatal' ? 'bg-red-500/20 text-red-400' :
                    error.level === 'error' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {error.category}
                  </span>
                  
                  <div className="flex-1">
                    <p className="text-white font-mono text-sm leading-relaxed">{error.message}</p>
                    <div className="flex gap-4 mt-2 text-xs text-slate-500">
                      <span>Seen {error.count}x</span>
                      <span>Last: {new Date(error.lastSeen).toLocaleTimeString()}</span>
                      <span>Path: {error.page}</span>
                    </div>
                  </div>
                </summary>

                {error.stack && (
                  <pre className="mt-4 p-4 bg-black rounded-md overflow-x-auto text-xs text-red-300 font-mono border border-red-900/30 whitespace-pre-wrap">
                    {error.stack}
                  </pre>
                )}
              </details>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
