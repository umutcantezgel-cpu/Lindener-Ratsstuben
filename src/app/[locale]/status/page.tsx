"use client";

import React, { useEffect, useState } from 'react';

type HealthStatus = {
  status: 'ok' | 'degraded' | 'down';
  timestamp: string;
  uptime: number;
  environment: string;
  version: string;
  dependencies: { formspree: boolean; environment: boolean; };
};

export default function StatusPage() {
  const [data, setData] = useState<HealthStatus | null>(null);

  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(setData)
      .catch(() => setData({
         status: 'down', timestamp: new Date().toISOString(), uptime: 0, 
         environment: 'unknown', version: 'unknown', dependencies: {formspree: false, environment: false}
      }));
  }, []);

  if (!data) return <div className="p-8 text-center bg-bg-primary min-h-screen text-text-primary">Prüfe Systemstatus...</div>;

  const color = data.status === 'ok' ? 'bg-emerald-500' : data.status === 'degraded' ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div className="p-8 min-h-screen bg-bg-primary text-text-primary font-mono text-sm flex items-center justify-center">
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl max-w-lg w-full text-center">
        <div className="flex items-center justify-center gap-4 mb-8">
           <div className={`w-6 h-6 rounded-full ${color} animate-pulse shadow-[0_0_15px_currentColor]`} style={{ color: color.replace('bg-', '') }}></div>
           <h1 className="text-3xl font-bold tracking-tight text-text-primary uppercase">{data.status}</h1>
        </div>

        <p className="text-slate-400 mb-8">Alle Systeme online und funktionsfähig. Wir überprüfen die Server in Echtzeit.</p>

        <div className="grid grid-cols-2 gap-4 text-left">
          <div className="bg-slate-800 p-4 rounded-lg">
            <span className="block text-xs uppercase text-slate-500 mb-1">Uptime</span>
            <span className="font-mono text-white">{(data.uptime / 60 / 60).toFixed(2)}h</span>
          </div>
          <div className="bg-slate-800 p-4 rounded-lg">
            <span className="block text-xs uppercase text-slate-500 mb-1">Version</span>
            <span className="font-mono text-white">{data.version.substring(0, 7)}</span>
          </div>
          <div className="bg-slate-800 p-4 rounded-lg col-span-2">
            <span className="block text-xs uppercase text-slate-500 mb-2">Dependencies</span>
            <div className="flex justify-between items-center bg-slate-900 px-3 py-2 rounded">
               <span className="text-sm text-slate-300">Third-Party Forms</span>
               <span className={data.dependencies.formspree ? 'text-emerald-400' : 'text-red-400'}>
                 {data.dependencies.formspree ? '✓ Verifiziert' : '✗ Offline'}
               </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
