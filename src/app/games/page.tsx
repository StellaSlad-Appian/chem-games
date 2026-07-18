import Link from 'next/link';
import { Beaker, FlaskConical, TestTube } from 'lucide-react';

const games = [{ href: '/games/acid-classification', title: 'Acid or Base?', description: 'Classify materials by their properties.', Icon: Beaker }, { href: '/games/formula-blaster', title: 'Formula Blaster', description: 'Pop target compounds before they escape.', Icon: FlaskConical }, { href: '/games/neutralise', title: 'Neutralise!', description: 'Defend the lab from molecule invaders.', Icon: TestTube }];

export default function GamesPage() {
  return <main className="min-h-screen bg-[var(--background)] px-4 py-24 text-[var(--foreground)]"><div className="mx-auto max-w-5xl"><Link href="/" className="text-sm font-bold text-blue-500 hover:underline">← Dashboard</Link><h1 className="mt-5 text-4xl font-black">Games</h1><p className="mt-2 text-muted">Choose an experiment to begin.</p><div className="mt-8 grid gap-5 md:grid-cols-3">{games.map(({ href, title, description, Icon }) => <Link key={href} href={href} className="game-card p-6 transition hover:-translate-y-1 hover:border-blue-400"><Icon className="h-8 w-8 text-blue-500" /><h2 className="mt-5 text-2xl font-black">{title}</h2><p className="mt-2 text-muted">{description}</p><span className="mt-5 inline-block font-bold text-blue-500">Play now →</span></Link>)}</div></div></main>;
}
