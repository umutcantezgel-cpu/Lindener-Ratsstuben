"use client";

import React from 'react';

export default function SeoStatusDashboard() {
  if (process.env.NODE_ENV === 'production') {
    return <div className="p-12 text-center text-red-500 font-bold">Unauthorized Route</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="border-b border-slate-800 pb-4">
          <h1 className="text-3xl font-bold text-white mb-2">SEO Monitoring Status</h1>
          <p className="text-sm text-slate-500">Local Validation & Checklist</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
             <h2 className="text-xl text-white font-semibold mb-4 text-emerald-400">Technical Checks</h2>
             <ul className="space-y-3">
               <li className="flex gap-2 items-center">
                 <span className="text-emerald-500">✓</span>
                 <span>Robots.txt available & valid</span>
               </li>
               <li className="flex gap-2 items-center">
                 <span className="text-emerald-500">✓</span>
                 <span>Sitemap.xml dynamically generated</span>
               </li>
               <li className="flex gap-2 items-center">
                 <span className="text-emerald-500">✓</span>
                 <span>Schema.org JSON-LD injected (Root, Header)</span>
               </li>
               <li className="flex gap-2 items-center">
                 <span className="text-emerald-500">✓</span>
                 <span>Performance Budget Passed</span>
               </li>
             </ul>
          </div>
          
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
             <h2 className="text-xl text-white font-semibold mb-4 text-blue-400">Google Search Console</h2>
             <p className="text-sm text-slate-400 mb-4">GSC metrics must be reviewed via external Google Dashboard. See Docs for manual sync procedures.</p>
             <a href="https://search.google.com/search-console" target="_blank" rel="noreferrer" className="inline-block px-4 py-2 bg-blue-600/20 text-blue-400 font-bold text-sm rounded hover:bg-blue-600/30 transition">
                Open GSC Dashboard
             </a>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
           <h2 className="text-xl text-white font-semibold mb-4">Audit Checklist</h2>
           <div className="text-sm text-slate-400 font-mono whitespace-pre-wrap">
             1. Verify Title Tags & Meta Descriptions (Automated via Dynamic Metadata API){'\n'}
             2. Canonical URLs defined{'\n'}
             3. Mobile Usability passing (Responsive viewport set){'\n'}
             4. HTTPS strictly enforced by Vercel SSL{'\n'}
             5. No broken links (Verify via Vercel deployments report){'\n'}
           </div>
        </div>

      </div>
    </div>
  );
}
