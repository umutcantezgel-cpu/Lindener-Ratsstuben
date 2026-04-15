import React from 'react';

export default function RootLoading() {
  return (
    <div className="pt-24 pb-20 min-h-screen bg-bg-beige animate-pulse flex flex-col items-center">
      <div className="container mx-auto px-4 w-full">
        <div className="h-10 bg-border rounded-md w-1/3 mb-6 mx-auto"></div>
        <div className="h-4 bg-border rounded-md w-1/2 mb-10 mx-auto"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-64 bg-border rounded-xl w-full"></div>
            ))}
        </div>
      </div>
    </div>
  );
}
