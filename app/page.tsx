// src/app/page.tsx
import Link from 'next/link';
import { Beaker, FlaskConical } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold tracking-tight mb-4 flex items-center justify-center gap-4">
          <FlaskConical className="w-12 h-12 text-neon" />
          ChemGames
        </h1>
        <p className="text-xl text-gray-500 max-w-lg mx-auto">
          Master chemistry through interactive experiments and time-based challenges.
        </p>
      </div>

      {/* Game Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        
        {/* Game Card 1 */}
        <Link 
          href="/games/acid-classification" 
          className="group block p-6 bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-acid transition-all hover:shadow-lg"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg text-acid group-hover:scale-110 transition-transform">
              <Beaker className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold">Acid or Base?</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Test your knowledge by classifying chemicals before the timer runs out!
          </p>
        </Link>

        {/* Placeholder for Game 2 */}
        <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center text-center opacity-70">
          <h2 className="text-xl font-bold mb-2">More Games Coming Soon</h2>
          <p className="text-sm text-gray-500">Molecule builder is currently in the lab.</p>
        </div>

      </div>
    </main>
  );
}
