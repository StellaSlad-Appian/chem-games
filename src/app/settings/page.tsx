import Link from 'next/link';
import { SettingsPanel } from '@/components/settings/SettingsPanel';

export default function SettingsPage() {
  return <main className="min-h-screen bg-[var(--background)] px-4 py-24 text-[var(--foreground)]"><div className="mx-auto max-w-5xl"><Link href="/" className="text-sm font-bold text-blue-500 hover:underline">← Dashboard</Link><div className="mt-6"><SettingsPanel /></div></div></main>;
}
