// src/app/(main)/privacy/page.tsx
//
// Plain-English privacy page. Every statement here describes what the code in
// this repository actually does; update it when data handling changes.

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy | ChemGames',
  description:
    'What ChemGames stores about you, what is public, who processes it, and how to download or delete your data.',
};

const EFFECTIVE_DATE = '14 September 2026';
const CONTACT_EMAIL = 'stella.slad@gmail.com';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-(--background) px-4 py-8 text-(--foreground) md:px-8">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-(--muted) transition hover:text-blue-500"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to Dashboard
        </Link>

        <div className="mt-6">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500 text-white">
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
            </span>
            <h1 className="text-4xl font-black md:text-5xl">Privacy</h1>
          </div>
          <p className="mt-2 text-base text-(--muted)">
            What ChemGames stores about you, who can see it, and how to download or delete it.
          </p>
        </div>

        <article className="mt-8 flex flex-col gap-6 rounded-2xl border-2 border-(--border) bg-(--surface) p-6 shadow-md md:p-8">
          <Section title="Who we are">
            <p>
              ChemGames is run by Stella Slad, who is the data controller for the information
              described on this page. You can reach us at{' '}
              <ContactLink />.
            </p>
            <p>Effective date: {EFFECTIVE_DATE}.</p>
          </Section>

          <Section title="What we collect">
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong className="text-(--foreground)">Account.</strong> Your email address and a
                password hash, stored by Supabase Auth. If you choose Google sign-in, we receive
                your Google account name, email address and avatar URL instead of a password.
              </li>
              <li>
                <strong className="text-(--foreground)">Profile.</strong> An alias, plus optional
                fields you can fill in: a title, your country, year level, lab notes, a favourite
                element and compound, and any badges you earn. We also store your visibility
                toggles, which decide what other people can see.{' '}
                {/* Depends on the fix/profile-privacy branch, which generates aliases and adds an
                    alias field to /profile/edit. Adjust if that branch does not land. */}
                Aliases are generated for you and contain no real name. You can change yours at{' '}
                <Link href="/profile/edit" className="font-bold text-blue-500 hover:underline">
                  /profile/edit
                </Link>
                .
              </li>
              <li>
                <strong className="text-(--foreground)">Gameplay.</strong> Each time you finish a
                game we record which game it was, your score, the level you reached, the outcome,
                how long you played and when. From these we keep your best score and level for
                each game, and derived stats on your profile such as your streak and accuracy.
              </li>
              <li>
                <strong className="text-(--foreground)">Feedback.</strong> When you use the
                feedback button we store the category, your message and the page you were on.{' '}
                {/* Depends on the fix/feedback-hardening branch, which records the account id and
                    a salted hash for rate limiting. Adjust if that branch does not land. */}
                We also store your account id if you are signed in, and a hashed, non-reversible
                identifier used only to limit abuse.
              </li>
            </ul>
          </Section>

          <Section title="What is public">
            <p>
              Your alias and your best score for each game appear on the public leaderboards,
              which anyone can see.
            </p>
            {/* Depends on profile reads being limited to toggled-on fields. The current
                "Profiles are publicly readable" policy allows every column through the API;
                see the fix/profile-privacy branch and the note in the PR. */}
            <p>
              Other profile fields, such as your country, year level, lab notes and game stats,
              are only shown where you switch the matching toggle on at{' '}
              <Link href="/profile/edit" className="font-bold text-blue-500 hover:underline">
                /profile/edit
              </Link>
              . All toggles except the joined date are off by default. Your title, favourite
              element and compound, and any badges are always shown with your alias.
            </p>
          </Section>

          <Section title="Cookies and local storage">
            <p>
              Signing in sets Supabase authentication session cookies. They are strictly necessary
              to keep you logged in, and they are the only cookies we set.
            </p>
            <p>
              Your browser&apos;s local storage holds your sound, theme and &quot;instructions
              seen&quot; preferences. That data stays on your device and is not sent to us.
            </p>
            <p>We do not use analytics, advertising or third-party tracking.</p>
          </Section>

          <Section title="Who processes it">
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong className="text-(--foreground)">Supabase</strong> hosts the database and
                handles authentication.
              </li>
              <li>
                <strong className="text-(--foreground)">Resend</strong> delivers feedback emails
                to us.
              </li>
              <li>
                <strong className="text-(--foreground)">Google</strong>, only if you use Google
                sign-in.
              </li>
              <li>The hosting provider that serves the site.</li>
            </ul>
            <p>Data is transmitted over HTTPS.</p>
          </Section>

          <Section title="How long we keep it">
            <p>We keep your data for as long as your account exists.</p>
            <p>
              When you delete your account, your profile, game sessions, progress and leaderboard
              entries are deleted immediately. Feedback you sent is kept but anonymised, because
              the reference to your account is removed.
            </p>
          </Section>

          <Section title="Your choices">
            <ul className="list-disc space-y-2 pl-5">
              <li>
                Edit your profile and visibility toggles at{' '}
                <Link href="/profile/edit" className="font-bold text-blue-500 hover:underline">
                  /profile/edit
                </Link>
                .
              </li>
              <li>Download a copy of your data from the same page.</li>
              <li>Delete your account from the same page.</li>
              <li>
                Or email us at <ContactLink /> and we will help.
              </li>
            </ul>
          </Section>

          <Section title="Children and students">
            <p>
              ChemGames is designed for secondary-school students, so we collect the minimum
              needed to run the games and keep scores.
            </p>
            {/* Same dependency on fix/profile-privacy as the alias note above. */}
            <p>
              No real name is required. Aliases are generated for you, contain no real name, and
              can be changed at{' '}
              <Link href="/profile/edit" className="font-bold text-blue-500 hover:underline">
                /profile/edit
              </Link>
              .
            </p>
            <p>
              Parents, guardians or teachers can contact us at <ContactLink /> to ask for a
              student&apos;s account and data to be deleted.
            </p>
          </Section>

          <Section title="Legal">
            <p>
              We handle personal information in line with the Australian Privacy Act 1988 and the
              Australian Privacy Principles.
            </p>
            <p>
              If you have a complaint, please contact us first. If you are not satisfied with our
              response, you can complain to the Office of the Australian Information Commissioner
              at{' '}
              <a
                href="https://www.oaic.gov.au"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-blue-500 hover:underline"
              >
                oaic.gov.au
              </a>
              .
            </p>
          </Section>

          <Section title="Changes to this page">
            <p>
              If our practices change, we will update this page and the effective date at the top.
            </p>
          </Section>
        </article>
      </div>
    </main>
  );
}

function ContactLink() {
  return (
    <a href={`mailto:${CONTACT_EMAIL}`} className="font-bold text-blue-500 hover:underline">
      {CONTACT_EMAIL}
    </a>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3 border-b border-(--border) pb-6 last:border-b-0 last:pb-0">
      <h2 className="text-2xl font-black text-(--foreground)">{title}</h2>
      <div className="space-y-3 text-sm font-medium leading-relaxed text-(--muted)">{children}</div>
    </section>
  );
}
