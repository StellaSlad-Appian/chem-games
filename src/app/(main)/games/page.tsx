// import Link from 'next/link';
// import { Beaker, FlaskConical, TestTube } from 'lucide-react';

// const games = [{ href: '/games/acid-classification', title: 'Acid or Base?', description: 'Classify materials by their properties.', Icon: Beaker }, { href: '/games/formula-blaster', title: 'Formula Blaster', description: 'Pop target compounds before they escape.', Icon: FlaskConical }, { href: '/games/neutralise', title: 'Neutralise!', description: 'Defend the lab from molecule invaders.', Icon: TestTube }];

// export default function GamesPage() {
//   return <main className="min-h-screen bg-(--background) px-4 py-24 text-(--foreground)"><div className="mx-auto max-w-5xl"><Link href="/" className="text-sm font-bold text-blue-500 hover:underline">← Dashboard</Link><h1 className="mt-5 text-4xl font-black">Games</h1><p className="mt-2 text-muted">Choose an experiment to begin.</p><div className="mt-8 grid gap-5 md:grid-cols-3">{games.map(({ href, title, description, Icon }) => <Link key={href} href={href} className="game-card p-6 transition hover:-translate-y-1 hover:border-blue-400"><Icon className="h-8 w-8 text-blue-500" /><h2 className="mt-5 text-2xl font-black">{title}</h2><p className="mt-2 text-muted">{description}</p><span className="mt-5 inline-block font-bold text-blue-500">Play now →</span></Link>)}</div></div></main>;
// }

import Link from 'next/link';
import { Beaker, FlaskConical, TestTube, Atom, Scale, Orbit } from 'lucide-react';
import { LEWIS_MESSAGES } from '@/core-engine/config/games/lewis-structures-messages';

const games = [
  { 
    href: '/games/acid-classification', 
    title: 'Acid or Base?', 
    description: 'Classify materials by their properties.', 
    Icon: Beaker 
  }, 
  { 
    href: '/games/formula-blaster', 
    title: 'Formula Blaster', 
    description: 'Pop target compounds before they escape.', 
    Icon: FlaskConical 
  }, 
  { 
    href: '/games/neutralise', 
    title: 'Neutralise!', 
    description: 'Defend the lab from molecule invaders.', 
    Icon: TestTube 
  },
  { 
    href: '/games/reaction-balancer', 
    title: 'Reaction Balancer', 
    description: 'Adjust stoichiometric coefficients to balance equations.', 
    Icon: Scale 
  },
  {
    href: '/games/lewis-structures',
    title: LEWIS_MESSAGES.hub.title,
    description: LEWIS_MESSAGES.hub.description,
    Icon: Orbit
  },
  {
    href: '/games/chemical-bonds', 
    title: 'Chemical Bonds', 
    description: 'Explore molecular structures and atomic bonding.', 
    Icon: Atom 
  }
];

export default function GamesPage() {
  return (
    <main className="min-h-screen bg-(--background) px-4 py-24 text-(--foreground)">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="text-sm font-bold text-blue-500 hover:underline">← Dashboard</Link>
        <h1 className="mt-5 text-4xl font-black">Games</h1>
        <p className="mt-2 text-muted">Choose an experiment to begin.</p>
        
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {games.map(({ href, title, description, Icon }) => (
            <Link 
              key={href} 
              href={href} 
              className="game-card p-6 transition hover:-translate-y-1 hover:border-blue-400"
            >
              <Icon className="h-8 w-8 text-blue-500" />
              <h2 className="mt-5 text-2xl font-black">{title}</h2>
              <p className="mt-2 text-muted">{description}</p>
              <span className="mt-5 inline-block font-bold text-blue-500">Play now →</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
