// src/app/page.tsx

import React from 'react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          ChemGames
        </h1>
        <p className="text-lg md:text-xl text-slate-300">
          Interactive chemistry mechanics. Build molecules, simulate reactions, and explore the elements.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <button className="w-full sm:w-auto px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold rounded-full transition-transform hover:scale-105 active:scale-95">
            Enter the Lab
          </button>
          <button className="w-full sm:w-auto px-6 py-3 bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold rounded-full border border-slate-700 transition-colors">
            View Periodic Table
          </button>
        </div>
      </div>
    </main>
  );
}
