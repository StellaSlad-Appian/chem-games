// src/app/[lang]/(main)/privacy/page.tsx
//
// Plain-language privacy page. Every statement here describes what the code in
// this repository actually does; update it when data handling changes.
//
// The prose lives in the i18n dictionaries (`privacy` namespace) rather than in
// this file, so the page exists in every language. The sentences are split at
// the points where a link or a <strong> interrupts them, and the link itself is
// substituted into a `{link}` / `{email}` placeholder by `withPlaceholder()`
// below — that way a translator sees whole sentences and can move the link to
// wherever German word order wants it.
//
// The Australian legal references (Privacy Act 1988, the Australian Privacy
// Principles, the OAIC) are proper nouns and stay in English in every locale.

import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { ADULT_PROSE } from '@/components/layout/adult-prose';
import { LocaleLink } from '@/components/layout/LocaleLink';
import { DEFAULT_LOCALE, formattingLocale, isLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { format } from '@/i18n/format';

/**
 * When this policy took effect, as a machine-readable date rather than as
 * English prose.
 *
 * It used to be the string '14 September 2026', interpolated straight into
 * `{date}` — so the German page read "Gültig ab: 14 September 2026", with an
 * English month name in the middle of a German sentence, and the French and
 * Spanish pages were wrong the same way. It is a date, not copy, so it is
 * stored as one and formatted per locale below.
 *
 * ISO 8601, parsed as UTC: a plain `new Date('2026-09-14')` is already UTC,
 * but writing the time on makes it explicit that the day must not shift in a
 * negative-offset timezone. Same reasoning as
 * `formatLeaderboardDate` in PublicLeaderboard.tsx, which is the pattern here.
 */
const EFFECTIVE_DATE = new Date('2026-09-14T00:00:00Z');
const CONTACT_EMAIL = 'stella.slad@gmail.com';
const PROFILE_EDIT_PATH = '/profile/edit';
const OAIC_URL = 'https://www.oaic.gov.au';

export async function generateMetadata(props: PageProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await props.params;
  const t = await getDictionary(lang);
  return {
    title: t.meta.privacyTitle,
    description: t.meta.privacyDescription,
  };
}

/**
 * The effective date, written the way the reader's language writes a date.
 *
 * `long` rather than `short` because this is running prose, not a table cell:
 * English gets "14 September 2026", German "14. September 2026", French
 * "14 septembre 2026", Spanish "14 de septiembre de 2026" and Italian
 * "14 settembre 2026" — each with its own month name, word order and
 * punctuation, none of which this file has to know about.
 */
function formatEffectiveDate(locale: Locale): string {
  return new Intl.DateTimeFormat(formattingLocale(locale), {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(EFFECTIVE_DATE);
}

/**
 * Splits a sentence on a `{name}` placeholder and drops `node` into the gap.
 * Returns the sentence unchanged (with the placeholder removed) if the
 * translation lost the placeholder, rather than rendering "{link}" to a reader.
 */
function withPlaceholder(template: string, name: string, node: ReactNode): ReactNode {
  const parts = template.split(`{${name}}`);
  if (parts.length < 2) return template;
  return (
    <>
      {parts[0]}
      {node}
      {parts.slice(1).join(`{${name}}`)}
    </>
  );
}

export default async function PrivacyPage(props: PageProps<'/[lang]'>) {
  const { lang } = await props.params;
  const t = await getDictionary(lang);
  const p = t.privacy;
  // Matches the root layout: a layout or page must never throw on an unknown
  // segment, because the 404 renders inside it.
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;

  const contact = <ContactLink />;
  const profileEditLink = (
    <LocaleLink href={PROFILE_EDIT_PATH} className="font-bold text-(--link) hover:underline">
      {PROFILE_EDIT_PATH}
    </LocaleLink>
  );
  const oaicLink = (
    <a
      href={OAIC_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="font-bold text-(--link) hover:underline"
    >
      oaic.gov.au
    </a>
  );

  return (
    <main className="min-h-screen bg-(--background) px-4 py-8 text-(--foreground) md:px-8">
      {/*
        `max-w-6xl`, matching the home page — see the same comment on the For
        Teachers page for why, and why line length is capped independently
        with `max-w-[75ch]` on each block of prose rather than left to the
        container.
      */}
      <div className="mx-auto max-w-6xl">
        <LocaleLink
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-(--muted) transition hover:text-(--link)"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden="true" /> {t.common.backToDashboard}
        </LocaleLink>

        <div className="mt-6">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-(--action) text-white">
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
            </span>
            <h1 className="text-4xl font-black md:text-5xl">{p.heading}</h1>
          </div>
          <p className={`mt-2 max-w-[75ch] text-base text-(--muted) ${ADULT_PROSE}`}>{p.intro}</p>
        </div>

        {/*
          Two columns from `lg` up, single column below it. The sidebar
          renders first in source order and is pushed right with `lg:order-2`
          — DOM order is reading order and tab order for every reader, not
          only the one who can see it beside the main column visually. Same
          layout and the same reasoning as the For Teachers page's.

          What's in the sidebar is the short, "what do I do right now"
          material — who to contact, and the plain list of actions a reader
          can take — not the substance of the policy. Children's privacy stays
          in the main column deliberately even though it is short-ish: it is
          the single most load-bearing section on this page, not a pointer.

          `lg:sticky lg:top-20`: the sidebar is much shorter than the main
          column, and a grid track reserves its width for the whole row
          height regardless, so without this its three cards would end a
          screen or two down and leave an empty gutter for the rest of the
          policy.
        */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px] lg:items-start">
          <div className="flex flex-col gap-6 lg:sticky lg:top-20 lg:order-2">
            <section
              aria-labelledby="privacy-who"
              className="rounded-2xl border-2 border-(--border) bg-(--surface) p-6 shadow-md"
            >
              <h2 id="privacy-who" className="text-2xl font-black text-(--foreground)">
                {p.whoWeAreHeading}
              </h2>
              <div
                className={`mt-3 space-y-3 text-sm font-medium leading-relaxed text-(--muted) ${ADULT_PROSE}`}
              >
                <p>{withPlaceholder(p.whoWeAreBody, 'email', contact)}</p>
                <p>{format(p.effectiveDate, { date: formatEffectiveDate(locale) })}</p>
              </div>
            </section>

            <section
              aria-labelledby="privacy-choices"
              className="rounded-2xl border-2 border-(--border) bg-(--surface) p-6 shadow-md"
            >
              <h2 id="privacy-choices" className="text-2xl font-black text-(--foreground)">
                {p.choicesHeading}
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm font-medium leading-relaxed text-(--muted)">
                <li>{withPlaceholder(p.choicesEdit, 'link', profileEditLink)}</li>
                <li>{p.choicesDownload}</li>
                <li>{p.choicesDelete}</li>
                <li>{withPlaceholder(p.choicesEmail, 'email', contact)}</li>
              </ul>
            </section>

            <section
              aria-labelledby="privacy-changes"
              className="rounded-2xl border-2 border-(--border) bg-(--surface) p-6 shadow-md"
            >
              <h2 id="privacy-changes" className="text-2xl font-black text-(--foreground)">
                {p.changesHeading}
              </h2>
              <div
                className={`mt-3 space-y-3 text-sm font-medium leading-relaxed text-(--muted) ${ADULT_PROSE}`}
              >
                <p>{p.changesBody}</p>
              </div>
            </section>
          </div>

          <article className="flex flex-col gap-6 rounded-2xl border-2 border-(--border) bg-(--surface) p-6 shadow-md md:p-8 lg:order-1">
            <Section title={p.collectHeading}>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <Term>{p.collectAccountLabel}</Term> {p.collectAccountBody}
                </li>
                <li>
                  <Term>{p.collectProfileLabel}</Term>{' '}
                  {withPlaceholder(p.collectProfileBody, 'link', profileEditLink)}
                </li>
                <li>
                  <Term>{p.collectGameplayLabel}</Term> {p.collectGameplayBody}
                </li>
                <li>
                  <Term>{p.collectFeedbackLabel}</Term> {p.collectFeedbackBody}
                </li>
                <li>
                  <Term>{p.collectCollaboratorLabel}</Term> {p.collectCollaboratorBody}
                </li>
              </ul>
            </Section>

            {/*
              The collaborator list gets its own section rather than a bullet
              in the list above, because it is the only personal data on this
              site that names a person directly — everything else is
              pseudonymous by construction. docs/COLLABORATORS.md § 0 requires
              it to state what is collected, why, the lawful basis, the
              retention and a deletion route that works without an account,
              and this is where all five live.
            */}
            <Section title={p.collaboratorsHeading}>
              <p>{p.collaboratorsWhy}</p>
              <p>{p.collaboratorsBasis}</p>
              <p>{p.collaboratorsUse}</p>
              <p>{p.collaboratorsRetention}</p>
              <p>{withPlaceholder(p.collaboratorsDelete, 'email', contact)}</p>
            </Section>

            <Section title={p.publicHeading}>
              <p>{p.publicBody1}</p>
              <p>{withPlaceholder(p.publicBody2, 'link', profileEditLink)}</p>
            </Section>

            <Section title={p.cookiesHeading}>
              <p>{p.cookiesBody1}</p>
              <p>{p.cookiesBody2}</p>
              <p>{p.cookiesBody3}</p>
              <p>{p.cookiesBody4}</p>
            </Section>

            <Section title={p.processorsHeading}>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <Term>{p.processorSupabaseLabel}</Term> {p.processorSupabaseBody}
                </li>
                <li>
                  <Term>{p.processorResendLabel}</Term> {p.processorResendBody}
                </li>
                <li>
                  <Term>{p.processorGoogleLabel}</Term> {p.processorGoogleBody}
                </li>
                <li>{p.processorHosting}</li>
              </ul>
              <p>{p.processorsTransport}</p>
            </Section>

            <Section title={p.retentionHeading}>
              <p>{p.retentionBody1}</p>
              <p>{p.retentionBody2}</p>
            </Section>

            <Section title={p.childrenHeading}>
              <p>{p.childrenBody1}</p>
              <p>{withPlaceholder(p.childrenBody2, 'link', profileEditLink)}</p>
              <p>{withPlaceholder(p.childrenBody3, 'email', contact)}</p>
            </Section>

            <Section title={p.legalHeading}>
              <p>{p.legalBody1}</p>
              <p>{withPlaceholder(p.legalBody2, 'link', oaicLink)}</p>
            </Section>
          </article>
        </div>
      </div>
    </main>
  );
}

function ContactLink() {
  return (
    <a href={`mailto:${CONTACT_EMAIL}`} className="font-bold text-(--link) hover:underline">
      {CONTACT_EMAIL}
    </a>
  );
}

function Term({ children }: { children: ReactNode }) {
  return <strong className="text-(--foreground)">{children}</strong>;
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-3 border-b border-(--border) pb-6 last:border-b-0 last:pb-0">
      <h2 className="text-2xl font-black text-(--foreground)">{title}</h2>
      {/* `max-w-[75ch]`: see the same comment on the For Teachers page's `Section`. */}
      <div
        className={`max-w-[75ch] space-y-3 text-sm font-medium leading-relaxed text-(--muted) ${ADULT_PROSE}`}
      >
        {children}
      </div>
    </section>
  );
}
