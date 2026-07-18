import Link from 'next/link';
import AuthForm from '@/components/auth/AuthForm';
import { isSupabaseConfigured } from '@/lib/supabase/config';

type Props = { searchParams: Promise<{ error?: string }> };
export default async function AuthPage({ searchParams }: Props) {
  const { error } = await searchParams;
  return <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-10 text-white"><div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] [background-size:4rem_4rem]" /><Link href="/" className="absolute left-5 top-5 text-sm font-bold text-slate-400 hover:text-white">← Back to games</Link><AuthForm configured={isSupabaseConfigured()} initialError={error} /></main>;
}
