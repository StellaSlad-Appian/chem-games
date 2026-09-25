// src/components/auth/AuthForm.tsx
'use client';

import { useState } from 'react';
import { Atom, CheckCircle2, LoaderCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useI18n } from '@/i18n/client';
import { localizePath } from '@/i18n/routing';

type Mode = 'login' | 'register';

interface AuthFormProps {
  configured: boolean;
  initialError?: string;
}

export default function AuthForm({ configured, initialError }: AuthFormProps) {
  const { t, locale } = useI18n();
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [pending, setPending] = useState(false);

  // The error arrives as a code in the query string (?error=verification), set
  // by the OAuth callback route, so it can be translated here rather than
  // travelling as prose through a redirect.
  const initialMessage =
    initialError === 'verification'
      ? t.auth.errorVerification
      : initialError === 'configuration'
        ? t.auth.errorConfiguration
        : '';
  const visibleMessage = message || initialMessage;

  // /auth/callback deliberately has no locale prefix: it is the redirect URL
  // registered with Supabase and must stay stable. The callback reads the
  // locale cookie and sends the reader on to a localized page.
  const returnUrl =
    typeof window === 'undefined' ? '' : `${window.location.origin}/auth/callback`;

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!configured) return;

    setMessage('');
    setPending(true);

    const supabase = createClient();
    if (!supabase) {
      setPending(false);
      setMessage(t.auth.unconfiguredClient);
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
      // Supabase returns its own English message here. Mapping its error codes
      // onto translated copy is tracked as follow-up work in
      // docs/i18n/README.md § Known gaps.
      setMessage(result.error.message);
      return;
    }

    if (mode === 'register') {
      setMessage(t.auth.checkInbox);
      return;
    }

    window.location.assign(localizePath('/', locale));
  }

  async function signInWithGoogle() {
    if (!configured) return;

    setMessage('');
    setPending(true);

    const supabase = createClient();
    if (!supabase) {
      setPending(false);
      setMessage(t.auth.unconfiguredClient);
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
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-(--link)/30 bg-(--info-surface) text-(--link)">
          <Atom className="h-6 w-6" aria-hidden="true" />
        </div>
        <h1 className="text-2xl font-black text-(--foreground)">
          {mode === 'login' ? t.auth.loginTitle : t.auth.registerTitle}
        </h1>
        <p className="mt-1 text-xs font-bold text-(--muted)">
          {mode === 'login' ? t.auth.loginSubtitle : t.auth.registerSubtitle}
        </p>
      </div>

      {/* Social Login */}
      <button
        type="button"
        onClick={signInWithGoogle}
        disabled={!configured || pending}
        className="flex w-full items-center justify-center gap-3 rounded-xl border border-(--border) bg-(--surface-2) px-4 py-3 text-xs font-black uppercase tracking-wider text-(--foreground) shadow-sm transition hover:border-(--link) disabled:cursor-not-allowed disabled:opacity-50"
      >
        <GoogleMark /> {t.auth.continueWithGoogle}
      </button>

      {/* Divider */}
      <div className="my-6 flex items-center gap-3 text-xs font-black uppercase tracking-wider text-(--muted)">
        <span className="h-px flex-1 bg-(--border)" />
        {t.auth.or}
        <span className="h-px flex-1 bg-(--border)" />
      </div>

      {/* Form */}
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label
            htmlFor="auth-email"
            className="block text-xs font-black uppercase tracking-wider text-(--foreground)"
          >
            {t.auth.email}
          </label>
          <input
            id="auth-email"
            required
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-1.5 w-full rounded-xl border border-(--border-strong) bg-(--surface) px-3.5 py-2.5 text-sm font-bold text-(--foreground) outline-none transition focus:border-(--link) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--link)"
            placeholder={t.auth.emailPlaceholder}
          />
        </div>

        <div>
          <label
            htmlFor="auth-password"
            className="block text-xs font-black uppercase tracking-wider text-(--foreground)"
          >
            {t.auth.password}
          </label>
          <input
            id="auth-password"
            required
            minLength={6}
            type="password"
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-1.5 w-full rounded-xl border border-(--border-strong) bg-(--surface) px-3.5 py-2.5 text-sm font-bold text-(--foreground) outline-none transition focus:border-(--link) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--link)"
            placeholder={t.auth.passwordPlaceholder}
          />
        </div>

        <button
          disabled={!configured || pending}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-(--action) px-4 py-3 text-xs font-black uppercase tracking-wider text-white shadow-md transition hover:bg-(--action-hover) disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending && <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />}
          {mode === 'login' ? t.auth.loginAction : t.auth.registerAction}
        </button>
      </form>

      {/* Status Feedback */}
      {visibleMessage && (
        <p
          role="status"
          className="mt-4 flex gap-2 rounded-xl border border-(--link)/30 bg-(--info-surface) p-3 text-xs font-bold text-(--link)"
        >
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {visibleMessage}
        </p>
      )}

      {!configured && (
        <p className="mt-4 rounded-xl border border-(--accent)/30 bg-(--accent-surface) p-3 text-xs font-bold text-(--accent)">
          {t.auth.unconfiguredNotice}
        </p>
      )}

      {/* Switch Mode Toggle */}
      <p className="mt-6 text-center text-xs font-bold text-(--muted)">
        {mode === 'login' ? t.auth.switchToRegisterPrompt : t.auth.switchToLoginPrompt}{' '}
        <button
          type="button"
          onClick={() => switchMode(mode === 'login' ? 'register' : 'login')}
          className="font-black text-(--link) hover:underline"
        >
          {mode === 'login' ? t.auth.switchToRegisterAction : t.auth.switchToLoginAction}
        </button>
      </p>
    </div>
  );
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
