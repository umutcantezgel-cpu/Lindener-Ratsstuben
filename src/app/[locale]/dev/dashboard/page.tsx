"use client";

import React, { useEffect, useState } from 'react';

export default function UnifiedConsole() {
  const [activeTab, setActiveTab] = useState('health');
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [health, setHealth] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [vitals, setVitals] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [deployments, setDeployments] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [conversions, setConversions] = useState<any>(null);

  useEffect(() => {
    // Parallel fetchens of data
    Promise.all([
      fetch('/api/health').then(r => r.json()).catch(() => null),
      fetch('/api/monitoring/vitals').then(r => r.json()).catch(() => []),
      fetch('/api/monitoring/deployments').then(r => r.json()).catch(() => []),
      fetch('/api/monitoring/conversions').then(r => r.json()).catch(() => null)
    ]).then(([h, v, d, c]) => {
      setHealth(h);
      setVitals(v);
      setDeployments(d);
      setConversions(c);
    });
  }, []);

  if (process.env.NODE_ENV === 'production') {
    return <div className="p-12 text-center text-red-500 font-bold">Unauthorized Route</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex justify-between items-center border-b border-slate-800 pb-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">System Operations Control</h1>
            <p className="text-sm text-slate-500">Local Zero-SaaS Analytics & Monitoring</p>
          </div>
          <div className="flex gap-2">
            <a href="/dev/errors" className="px-4 py-2 border border-slate-700 bg-slate-900 hover:bg-slate-800 text-white rounded text-sm transition">
               Full Error Logs
            </a>
          </div>
        </header>

        <div className="flex gap-4 border-b border-slate-800 pb-2 overflow-x-auto">
          {['health', 'vitals', 'conversions', 'deployments'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium capitalize transition rounded ${
                 activeTab === tab ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 min-h-[400px]">
          {activeTab === 'health' && (
            <div className="space-y-6">
               <h2 className="text-xl text-white font-semibold flex justify-between items-center">
                 API Health Status
                 <span className={`px-2 py-1 text-xs rounded full ${health?.status === 'ok' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                   {health?.status || 'UNKNOWN'}
                 </span>
               </h2>
               
               {health ? (
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                   <div className="bg-slate-950 p-4 border border-slate-800 rounded">
                     <div className="text-xs text-slate-500 mb-1 leading-none uppercase">Uptime</div>
                     <div className="text-lg text-white">{(health.uptime / 60 / 60).toFixed(2)}h</div>
                   </div>
                   <div className="bg-slate-950 p-4 border border-slate-800 rounded">
                     <div className="text-xs text-slate-500 mb-1 leading-none uppercase">Memory RSS</div>
                     <div className="text-lg text-white">{health.memory?.rssMB || 0} MB</div>
                   </div>
                   <div className="bg-slate-950 p-4 border border-slate-800 rounded">
                     <div className="text-xs text-slate-500 mb-1 leading-none uppercase">Env</div>
                     <div className="text-lg text-white capitalize">{health.environment}</div>
                   </div>
                   <div className="bg-slate-950 p-4 border border-slate-800 rounded">
                     <div className="text-xs text-slate-500 mb-1 leading-none uppercase">Version</div>
                     <div className="text-lg text-white font-mono">{health.version}</div>
                   </div>
                 </div>
               ) : (
                 <div className="text-slate-500">Loading health metrics...</div>
               )}
            </div>
          )}

          {activeTab === 'vitals' && (
            <div className="space-y-6">
               <h2 className="text-xl text-white font-semibold">Web Vitals Telemetry</h2>
               {vitals.length === 0 ? (
                 <div className="text-slate-500">No Web Vitals metrics recorded in LRU cache yet. Navigate the site to generate telemetry.</div>
               ) : (
                 <div className="space-y-4">
                   {vitals.map(v => (
                     <div key={v.metric} className="flex justify-between items-center bg-slate-950 p-4 border border-slate-800 rounded">
                        <div>
                          <div className="text-white font-bold mb-1">{v.metric}</div>
                          <div className="text-xs text-slate-500">Based on {v.samples} samples</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-mono text-white">{v.avg} {(v.metric === 'CLS' || v.metric === 'INP') ? '' : 'ms'}</div>
                          {v.poorCount > 0 && <div className="text-xs text-red-400 mt-1">{v.poorCount} poor evaluations</div>}
                        </div>
                     </div>
                   ))}
                 </div>
               )}
            </div>
          )}

          {activeTab === 'conversions' && (
            <div className="space-y-6">
               <h2 className="text-xl text-white font-semibold">Conversion Tracking</h2>
               {conversions ? (
                 <>
                   <div className="grid grid-cols-2 gap-4">
                     <div className="bg-slate-950 p-4 border border-slate-800 rounded flex flex-col justify-center items-center h-32">
                       <div className="text-4xl text-emerald-400 font-bold mb-2">{conversions.weeklyConversions}</div>
                       <div className="text-xs text-slate-500 uppercase">Recent Events</div>
                     </div>
                     <div className="bg-slate-950 p-4 border border-slate-800 rounded flex flex-col h-32 justify-center">
                       <span className="text-sm text-slate-400 mb-2 block">Anomaly AI Check</span>
                       <span className={conversions.anomalies === 'none' ? 'text-emerald-400 font-medium' : 'text-red-400 font-bold'}>
                         {conversions.anomalies === 'none' ? '✓ Data looks normal' : conversions.anomalies}
                       </span>
                     </div>
                   </div>
                 </>
               ) : (
                 <div className="text-slate-500">Loading conversion analytics...</div>
               )}
            </div>
          )}

          {activeTab === 'deployments' && (
             <div className="space-y-6">
               <h2 className="text-xl text-white font-semibold">Deployment Roll</h2>
               {deployments.length === 0 ? (
                 <div className="text-slate-500">No deployments registered in current node lifetime.</div>
               ) : (
                 <table className="w-full text-left text-sm text-slate-300">
                    <thead className="bg-slate-950 text-slate-500 text-xs uppercase">
                       <tr>
                          <th className="px-4 py-3">Timestamp</th>
                          <th className="px-4 py-3">Version/Commit</th>
                          <th className="px-4 py-3">Environment</th>
                          <th className="px-4 py-3">Status</th>
                       </tr>
                    </thead>
                    <tbody>
                      {deployments.map((d, i) => (
                        <tr key={i} className="border-b border-slate-800/50">
                           <td className="px-4 py-3 text-slate-400">{new Date(d.timestamp).toLocaleString()}</td>
                           <td className="px-4 py-3 font-mono text-white">{d.version.substring(0,7)}</td>
                           <td className="px-4 py-3 capitalize">{d.environment}</td>
                           <td className="px-4 py-3">
                              <span className={`px-2 py-1 text-xs rounded full ${d.status==='success' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                                {d.status}
                              </span>
                           </td>
                        </tr>
                      ))}
                    </tbody>
                 </table>
               )}
             </div>
          )}

        </div>
      </div>
    </div>
  );
}
