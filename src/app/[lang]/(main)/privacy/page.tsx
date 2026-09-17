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
import { LocaleLink } from '@/components/layout/LocaleLink';
import { getDictionary } from '@/i18n/dictionaries';
import { format } from '@/i18n/format';

const EFFECTIVE_DATE = '14 September 2026';
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

  const contact = <ContactLink />;
  const profileEditLink = (
    <LocaleLink href={PROFILE_EDIT_PATH} className="font-bold text-blue-500 hover:underline">
      {PROFILE_EDIT_PATH}
    </LocaleLink>
  );
  const oaicLink = (
    <a
      href={OAIC_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="font-bold text-blue-500 hover:underline"
    >
      oaic.gov.au
    </a>
  );

  return (
    <main className="min-h-screen bg-(--background) px-4 py-8 text-(--foreground) md:px-8">
      <div className="mx-auto max-w-3xl">
        <LocaleLink
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-(--muted) transition hover:text-blue-500"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden="true" /> {t.common.backToDashboard}
        </LocaleLink>

        <div className="mt-6">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500 text-white">
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
            </span>
            <h1 className="text-4xl font-black md:text-5xl">{p.heading}</h1>
          </div>
          <p className="mt-2 text-base text-(--muted)">{p.intro}</p>
        </div>

        <article className="mt-8 flex flex-col gap-6 rounded-2xl border-2 border-(--border) bg-(--surface) p-6 shadow-md md:p-8">
          <Section title={p.whoWeAreHeading}>
            <p>{withPlaceholder(p.whoWeAreBody, 'email', contact)}</p>
            <p>{format(p.effectiveDate, { date: EFFECTIVE_DATE })}</p>
          </Section>

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
            </ul>
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

          <Section title={p.choicesHeading}>
            <ul className="list-disc space-y-2 pl-5">
              <li>{withPlaceholder(p.choicesEdit, 'link', profileEditLink)}</li>
              <li>{p.choicesDownload}</li>
              <li>{p.choicesDelete}</li>
              <li>{withPlaceholder(p.choicesEmail, 'email', contact)}</li>
            </ul>
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

          <Section title={p.changesHeading}>
            <p>{p.changesBody}</p>
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

function Term({ children }: { children: ReactNode }) {
  return <strong className="text-(--foreground)">{children}</strong>;
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-3 border-b border-(--border) pb-6 last:border-b-0 last:pb-0">
      <h2 className="text-2xl font-black text-(--foreground)">{title}</h2>
      <div className="space-y-3 text-sm font-medium leading-relaxed text-(--muted)">{children}</div>
    </section>
  );
}
