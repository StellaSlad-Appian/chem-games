// src/app/[lang]/(main)/about/page.tsx
//
// The About page: why the site exists, who makes it, and how the games are
// meant to help — for parents and teachers. The For Teachers page keeps the
// practical detail (games, accessibility, privacy in full, collaborators);
// this one keeps the story, and the two link to each other instead of
// repeating each other.
//
// English only until the copy is translated: any locale without a catalogue
// in src/i18n/about.ts is a 404 here, and the footer link and the For Teachers
// pointer are hidden to match. See the note at the top of that file.
//
// Shape copied from ../teachers/page.tsx: an async Server Component, copy from
// a server-only catalogue, and `withPlaceholder()` where a link interrupts a
// sentence so a translator can keep the word order.

import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  BookOpen,
  ExternalLink,
  GraduationCap,
  HeartHandshake,
  Lightbulb,
  Scale,
  Users,
} from 'lucide-react';
import { ADULT_PROSE } from '@/components/layout/adult-prose';
import { LocaleLink } from '@/components/layout/LocaleLink';
import { aboutCopy } from '@/i18n/about';
import { DEFAULT_LOCALE, isLocale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';

const LINK_CLASS =
  'font-bold text-(--link) hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--link)';

export async function generateMetadata(props: PageProps<'/[lang]/about'>): Promise<Metadata> {
  const { lang } = await props.params;
  const p = aboutCopy(isLocale(lang) ? lang : DEFAULT_LOCALE);
  if (!p) notFound();
  return { title: p.metaTitle, description: p.metaDescription };
}

/**
 * Splits a sentence on a `{name}` placeholder and drops `node` into the gap.
 * The same helper as the For Teachers and privacy pages'; see the note there
 * on why it is not shared yet.
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

export default async function AboutPage(props: PageProps<'/[lang]/about'>) {
  const { lang } = await props.params;
  const locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const p = aboutCopy(locale);
  if (!p) notFound();
  const t = await getDictionary(locale);

  const privacyLink = (
    <LocaleLink href="/privacy" className={LINK_CLASS}>
      {p.privacyLinkLabel}
    </LocaleLink>
  );
  const teachersLink = (
    <LocaleLink href="/teachers" className={LINK_CLASS}>
      {t.footer.teachers}
    </LocaleLink>
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
          className="inline-flex min-h-6 items-center gap-2 py-1 text-sm font-bold text-(--muted) transition hover:text-(--link) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--link)"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden="true" /> {t.common.backToDashboard}
        </LocaleLink>

        <div className="mt-6">
          <h1 className="text-4xl font-black md:text-5xl">{p.heading}</h1>
          <p className={`mt-2 max-w-[75ch] text-base text-(--muted) ${ADULT_PROSE}`}>{p.intro}</p>
        </div>

        {/*
          Two columns from `lg` up, single column below it. The sidebar
          renders first in source order and is pushed right with `lg:order-2`
          — DOM order is reading order and tab order for every reader, not
          only the one who can see it beside the story visually. Same layout
          and the same reasoning as the For Teachers page's, including
          `lg:sticky lg:top-20` on the sidebar: it is much shorter than the
          main column, and a grid track reserves its width for the whole row
          height regardless, so without this the two pointer cards would end
          a screen down and leave an empty gutter for the rest of the page.
        */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px] lg:items-start">
          <div className="flex flex-col gap-6 lg:sticky lg:top-20 lg:order-2">
            {/*
              Both of these are a pointer, not content of their own — one
              short paragraph each and a link to the page that actually
              answers the question. Sidebar-sized by nature, not trimmed to
              fit, unlike the For Teachers page's Collaborators card.
            */}
            <section
              aria-labelledby="about-parents"
              className="rounded-2xl border-2 border-(--border) bg-(--surface) p-6 shadow-md"
            >
              <h2
                id="about-parents"
                className="flex items-center gap-2 text-2xl font-black text-(--foreground)"
              >
                <Users className="h-5 w-5 shrink-0 text-(--link)" aria-hidden="true" />
                {p.parentsHeading}
              </h2>
              <div
                className={`mt-3 space-y-3 text-sm font-medium leading-relaxed text-(--muted) ${ADULT_PROSE}`}
              >
                <p>{withPlaceholder(p.parentsBody1, 'link', privacyLink)}</p>
                <p>{p.parentsBody2}</p>
              </div>
            </section>

            <section
              aria-labelledby="about-teachers"
              className="rounded-2xl border-2 border-(--border) bg-(--surface) p-6 shadow-md"
            >
              <h2
                id="about-teachers"
                className="flex items-center gap-2 text-2xl font-black text-(--foreground)"
              >
                <GraduationCap className="h-5 w-5 shrink-0 text-(--link)" aria-hidden="true" />
                {p.teachersHeading}
              </h2>
              <div
                className={`mt-3 space-y-3 text-sm font-medium leading-relaxed text-(--muted) ${ADULT_PROSE}`}
              >
                <p>{withPlaceholder(p.teachersBody, 'link', teachersLink)}</p>
              </div>
            </section>
          </div>

          <article className="flex flex-col gap-6 rounded-2xl border-2 border-(--border) bg-(--surface) p-6 shadow-md md:p-8 lg:order-1">
            <Section icon={HeartHandshake} title={p.storyHeading}>
              <p>{p.storyBody1}</p>
              <p>{p.storyBody2}</p>
              <p>{p.storyBody3}</p>
            </Section>

            <Section icon={Lightbulb} title={p.helpHeading}>
              <p>{p.helpIntro}</p>
              <ul className="space-y-3">
                {p.principles.map((principle) => (
                  <li key={principle.title}>
                    <strong className="font-bold text-(--foreground)">{principle.title}</strong>{' '}
                    {principle.body}
                  </li>
                ))}
              </ul>
            </Section>

            <Section icon={Scale} title={p.limitsHeading}>
              <p>{p.limitsBody1}</p>
              <p>{p.limitsBody2}</p>
              <p>{p.limitsBody3}</p>
            </Section>

            <Section icon={BookOpen} title={p.sourcesHeading}>
              <p>{p.sourcesIntro}</p>
              <ol className="list-decimal space-y-3 pl-5">
                {p.sources.map((source) => (
                  <li key={source.href}>
                    <a
                      href={source.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-(--link) hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--link)"
                    >
                      {source.citation}
                      <ExternalLink
                        className="ml-1 inline h-3.5 w-3.5 shrink-0 align-[-2px]"
                        aria-hidden="true"
                      />
                      <span className="sr-only">{t.common.opensInNewTab}</span>
                    </a>
                    <span className="mt-1 block">{source.note}</span>
                  </li>
                ))}
              </ol>
            </Section>
          </article>
        </div>
      </div>
    </main>
  );
}

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Users;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-3 border-b border-(--border) pb-6 last:border-b-0 last:pb-0">
      <h2 className="flex items-center gap-2 text-2xl font-black text-(--foreground)">
        <Icon className="h-5 w-5 shrink-0 text-(--link)" aria-hidden="true" />
        {title}
      </h2>
      {/* `max-w-[75ch]`: see the same comment on the For Teachers page's `Section`. */}
      <div
        className={`max-w-[75ch] space-y-3 text-sm font-medium leading-relaxed text-(--muted) ${ADULT_PROSE}`}
      >
        {children}
      </div>
    </section>
  );
}
