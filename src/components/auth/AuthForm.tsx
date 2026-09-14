// src/components/auth/AuthForm.tsx
'use client';

import { useState } from 'react';
import { Atom, CheckCircle2, LoaderCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

type Mode = 'login' | 'register';

interface AuthFormProps {
  configured: boolean;
  initialError?: string;
}

export default function AuthForm({ configured, initialError }: AuthFormProps) {
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(
    initialError ? errorMessage(initialError) : ''
  );
  const [pending, setPending] = useState(false);

  const returnUrl =
    typeof window === 'undefined'
      ? ''
      : `${window.location.origin}/auth/callback`;

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!configured) return;

    setMessage('');
    setPending(true);

    const supabase = createClient();
    if (!supabase) {
      setPending(false);
      setMessage('Authentication client is currently unconfigured.');
      return;
    }

    const result =
      mode === 'register'
        ? await supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: returnUrl },
          })
        : await supabase.auth.signInWithPassword({ email, password });

    setPending(false);

    if (result.error) {
      setMessage(result.error.message);
      return;
    }

    if (mode === 'register') {
      setMessage('Check your inbox to activate your ChemGames account.');
      return;
    }

    window.location.assign('/');
  }

  async function signInWithGoogle() {
    if (!configured) return;

    setMessage('');
    setPending(true);

    const supabase = createClient();
    if (!supabase) {
      setPending(false);
      setMessage('Authentication client is currently unconfigured.');
      return;
    }

    // Only sign-in identity is needed, so no offline access (refresh token) or forced consent is requested.
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: returnUrl,
      },
    });

    if (error) {
      setPending(false);
      setMessage(error.message);
    }
  }

  const switchMode = (nextMode: Mode) => {
    setMode(nextMode);
    setMessage('');
  };

  return (
    <div className="w-full max-w-md rounded-2xl border-2 border-(--border) bg-(--surface) p-6 shadow-md md:p-8">
      {/* Header */}
      <div className="mb-6 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-500">
          <Atom className="h-6 w-6" />
        </div>
        <h1 className="text-2xl font-black text-(--foreground)">
          {mode === 'login' ? 'Welcome back' : 'Join ChemGames'}
        </h1>
        <p className="mt-1 text-xs font-bold text-(--muted)">
          {mode === 'login'
            ? 'Pick up where your experiments left off.'
            : 'Create an account to save your progress.'}
        </p>
      </div>

      {/* Social Login */}
      <button
        type="button"
        onClick={signInWithGoogle}
        disabled={!configured || pending}
        className="flex w-full items-center justify-center gap-3 rounded-xl border border-(--border) bg-(--background) px-4 py-3 text-xs font-black uppercase tracking-wider text-(--foreground) shadow-sm transition hover:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <GoogleMark /> Continue with Google
      </button>

      {/* Divider */}
      <div className="my-6 flex items-center gap-3 text-xs font-black uppercase tracking-wider text-(--muted)">
        <span className="h-px flex-1 bg-(--border)" />
        or
        <span className="h-px flex-1 bg-(--border)" />
      </div>

      {/* Form */}
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-(--foreground)">
            Email
          </label>
          <input
            required
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-1.5 w-full rounded-xl border border-(--border) bg-(--background) px-3.5 py-2.5 text-sm font-bold text-(--foreground) outline-none transition focus:border-blue-500"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-(--foreground)">
            Password
          </label>
          <input
            required
            minLength={6}
            type="password"
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-1.5 w-full rounded-xl border border-(--border) bg-(--background) px-3.5 py-2.5 text-sm font-bold text-(--foreground) outline-none transition focus:border-blue-500"
            placeholder="At least 6 characters"
          />
        </div>

        <button
          disabled={!configured || pending}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-500 px-4 py-3 text-xs font-black uppercase tracking-wider text-white shadow-md transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending && <LoaderCircle className="h-4 w-4 animate-spin" />}
          {mode === 'login' ? 'Log in' : 'Create account'}
        </button>
      </form>

      {/* Status Feedback */}
      {message && (
        <p
          role="status"
          className="mt-4 flex gap-2 rounded-xl border border-blue-500/20 bg-blue-500/10 p-3 text-xs font-bold text-blue-500"
        >
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
          {message}
        </p>
      )}

      {!configured && (
        <p className="mt-4 rounded-xl border border-amber-500/20 bg-amber-500/10 p-3 text-xs font-bold text-amber-500">
          Authentication needs Supabase credentials. Copy <code>.env.example</code> to <code>.env.local</code> and fill in its values.
        </p>
      )}

      {/* Switch Mode Toggle */}
      <p className="mt-6 text-center text-xs font-bold text-(--muted)">
        {mode === 'login' ? 'New to ChemGames?' : 'Already have an account?'}{' '}
        <button
          type="button"
          onClick={() => switchMode(mode === 'login' ? 'register' : 'login')}
          className="font-black text-blue-500 hover:underline"
        >
          {mode === 'login' ? 'Register' : 'Log in'}
        </button>
      </p>
    </div>
  );
}

function errorMessage(error: string) {
  if (error === 'verification') return 'We could not verify that link. Please try again.';
  if (error === 'configuration') return 'Authentication is not configured yet.';
  return '';
}

function GoogleMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4">
      <path
        fill="#4285F4"
        d="M21.35 12.23c0-.71-.06-1.39-.18-2.05H12v3.88h5.24a4.48 4.48 0 0 1-1.94 2.94v2.52h3.15c1.84-1.69 2.9-4.18 2.9-7.29Z"
      />
      <path
        fill="#34A853"
        d="M12 21.75c2.63 0 4.84-.87 6.45-2.23l-3.15-2.52c-.87.59-1.98.94-3.3.94-2.54 0-4.7-1.72-5.47-4.03H3.29v2.6A9.75 9.75 0 0 0 12 21.75Z"
      />
      <path
        fill="#FBBC05"
        d="M6.53 13.91A5.87 5.87 0 0 1 6.22 12c0-.66.11-1.3.31-1.91v-2.6H3.29A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.06 1.04 4.51l3.24-2.6Z"
      />
      <path
        fill="#EA4335"
        d="M12 6.06c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.15 14.63 2.25 12 2.25a9.75 9.75 0 0 0-8.71 5.24l3.24 2.6C7.3 7.78 9.46 6.06 12 6.06Z"
      />
    </svg>
  );
}