'use client';

import { useState, type FormEvent } from 'react';
import { Atom, CheckCircle2, LoaderCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

type Mode = 'login' | 'register';
type Props = { configured: boolean; initialError?: string };

export default function AuthForm({ configured, initialError }: Props) {
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(initialError ? errorMessage(initialError) : '');
  const [pending, setPending] = useState(false);
  const returnUrl = typeof window === 'undefined' ? '' : `${window.location.origin}/auth/callback`;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!configured) return;
    setMessage(''); setPending(true);
    const result = mode === 'register'
      ? await createClient().auth.signUp({ email, password, options: { emailRedirectTo: returnUrl } })
      : await createClient().auth.signInWithPassword({ email, password });
    setPending(false);
    if (result.error) return setMessage(result.error.message);
    if (mode === 'register') return setMessage('Check your inbox to activate your ChemGames account.');
    window.location.assign('/');
  }

  async function signInWithGoogle() {
    if (!configured) return;
    setMessage(''); setPending(true);
    const { error } = await createClient().auth.signInWithOAuth({ provider: 'google', options: { redirectTo: returnUrl } });
    if (error) { setPending(false); setMessage(error.message); }
  }

  const switchMode = (nextMode: Mode) => { setMode(nextMode); setMessage(''); };
  return <div className="w-full max-w-md rounded-3xl border border-slate-700/80 bg-slate-900/80 p-6 shadow-2xl backdrop-blur sm:p-8">
    <div className="mb-7 text-center"><div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-400/30 bg-blue-950/50"><Atom className="h-8 w-8 text-blue-400" /></div><h1 className="text-3xl font-black tracking-tight text-white">{mode === 'login' ? 'Welcome back' : 'Join ChemGames'}</h1><p className="mt-2 text-sm text-slate-400">{mode === 'login' ? 'Pick up where your experiments left off.' : 'Create an account to save your progress.'}</p></div>
    <button type="button" onClick={signInWithGoogle} disabled={!configured || pending} className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-600 bg-white px-4 py-3 font-bold text-slate-800 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"><GoogleMark /> Continue with Google</button>
    <div className="my-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-slate-500"><span className="h-px flex-1 bg-slate-700" />or<span className="h-px flex-1 bg-slate-700" /></div>
    <form onSubmit={submit} className="space-y-4"><label className="block text-sm font-semibold text-slate-200">Email<input required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-3 text-white outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20" placeholder="you@example.com" /></label><label className="block text-sm font-semibold text-slate-200">Password<input required minLength={6} type="password" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} value={password} onChange={(event) => setPassword(event.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-3 text-white outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20" placeholder="At least 6 characters" /></label><button disabled={!configured || pending} className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-extrabold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50">{pending && <LoaderCircle className="h-4 w-4 animate-spin" />}{mode === 'login' ? 'Log in' : 'Create account'}</button></form>
    {message && <p role="status" className="mt-4 flex gap-2 rounded-xl border border-blue-400/20 bg-blue-950/40 p-3 text-sm text-blue-200"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />{message}</p>}
    {!configured && <p className="mt-4 rounded-xl border border-amber-400/20 bg-amber-950/30 p-3 text-sm text-amber-100">Authentication needs Supabase credentials. Copy <code>.env.example</code> to <code>.env.local</code> and fill in its values.</p>}
    <p className="mt-6 text-center text-sm text-slate-400">{mode === 'login' ? 'New to ChemGames?' : 'Already have an account?'} <button type="button" onClick={() => switchMode(mode === 'login' ? 'register' : 'login')} className="font-bold text-blue-300 hover:text-blue-200">{mode === 'login' ? 'Register' : 'Log in'}</button></p>
  </div>;
}

function errorMessage(error: string) { return error === 'verification' ? 'We could not verify that link. Please try again.' : error === 'configuration' ? 'Authentication is not configured yet.' : ''; }
function GoogleMark() { return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5"><path fill="#4285F4" d="M21.35 12.23c0-.71-.06-1.39-.18-2.05H12v3.88h5.24a4.48 4.48 0 0 1-1.94 2.94v2.52h3.15c1.84-1.69 2.9-4.18 2.9-7.29Z" /><path fill="#34A853" d="M12 21.75c2.63 0 4.84-.87 6.45-2.23l-3.15-2.52c-.87.59-1.98.94-3.3.94-2.54 0-4.7-1.72-5.47-4.03H3.29v2.6A9.75 9.75 0 0 0 12 21.75Z" /><path fill="#FBBC05" d="M6.53 13.91A5.87 5.87 0 0 1 6.22 12c0-.66.11-1.3.31-1.91v-2.6H3.29A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.06 1.04 4.51l3.24-2.6Z" /><path fill="#EA4335" d="M12 6.06c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.15 14.63 2.25 12 2.25a9.75 9.75 0 0 0-8.71 5.24l3.24 2.6C7.3 7.78 9.46 6.06 12 6.06Z" /></svg>; }
