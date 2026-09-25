// src/app/[lang]/(main)/teachers/page.tsx
//
// The "For Teachers" page — the acceptance criteria are in
// docs/TEACHERS_PAGE.md. It is the only adults-facing page on the site and the
// only place money is mentioned. The players are 14 to 16, cannot legally
// complete a payment, and must never meet a funding prompt; so the ask lives
// here, behind a footer link an adult has to go looking for, and nothing on
// this page is ever surfaced through a popup, interstitial or timed prompt.
//
// Shape copied from src/app/[lang]/(main)/privacy/page.tsx: an async Server
// Component, copy read through `getDictionary(lang)`, `generateMetadata` from
// the same dictionary, and `withPlaceholder()` where a link interrupts a
// sentence so the translator keeps the word order.
//
// Three things are deliberately *not* in the dictionary:
//
//   - the game titles, which come from `gamesHub` through `{placeholders}`, so
//     renaming a game cannot leave this page naming the old one;
//   - the cheat-sheet titles, which come from `getCheatSheets(locale)` — the
//     same localized data the cheat-sheet index renders, so a sheet added or
//     retitled shows up here with no edit;
//   - the full collaborator pitch and the sign-up form itself, which live on
//     their own page at `/teachers/collaborate` — see that route's own file
//     header for why, and docs/COLLABORATORS.md § 4 for the acceptance
//     criterion it satisfies. This page keeps only a short teaser and a link.
//
// The support section renders only when NEXT_PUBLIC_SUPPORT_URL is set, so the
// page could ship before the payment account existed. No payment form, widget
// or card field is ever embedded in this app: the link goes out to a hosted
// page, which keeps PCI scope, refunds and tax entirely outside the codebase.

import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import {
  Accessibility,
  ArrowLeft,
  BookMarked,
  Compass,
  Construction,
  ExternalLink,
  Gamepad2,
  GraduationCap,
  HeartHandshake,
  Languages,
  MessageSquarePlus,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { ADULT_PROSE } from '@/components/layout/adult-prose';
import { LocaleLink } from '@/components/layout/LocaleLink';
import { aboutCopy } from '@/i18n/about';
import { getCheatSheets } from '@/i18n/cheat-sheets';
import { DEFAULT_LOCALE, isLocale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { teachersCopy } from '@/i18n/teachers';
import { format } from '@/i18n/format';

const PRIVACY_PATH = '/privacy';

const INLINE_LINK_CLASS =
  'font-bold text-(--link) hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--link)';

export async function generateMetadata(
  props: PageProps<'/[lang]/teachers'>
): Promise<Metadata> {
  const { lang } = await props.params;
  const t = await getDictionary(lang);
  return {
    title: t.meta.teachersTitle,
    description: t.meta.teachersDescription,
  };
}

/**
 * Splits a sentence on a `{name}` placeholder and drops `node` into the gap.
 * Returns the sentence unchanged (with the placeholder removed) if the
 * translation lost the placeholder, rather than rendering "{link}" to a reader.
 *
 * The same helper as the privacy page's. It is duplicated rather than shared
 * because the two pages are the only callers and a two-page abstraction is not
 * yet an abstraction; if a third page needs it, lift all three at once.
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

export default async function TeachersPage(props: PageProps<'/[lang]/teachers'>) {
  const { lang } = await props.params;
  const locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const t = await getDictionary(locale);
  const p = teachersCopy(locale);
  const sheets = getCheatSheets(locale);
  const about = aboutCopy(locale);

  // Read as a bare `process.env.NEXT_PUBLIC_…` reference so Next can inline it
  // at build time (see the environment-variables guide). Unset means the whole
  // support section is absent, not an empty one.
  const supportUrl = process.env.NEXT_PUBLIC_SUPPORT_URL;

  const gameNames = {
    blaster: t.gamesHub.blasterTitle,
    neutralise: t.gamesHub.neutraliseTitle,
    balancer: t.gamesHub.balancerTitle,
    lewis: t.gamesHub.lewisTitle,
  };

  const games = [
    { href: '/games/acid-classification', title: t.gamesHub.acidTitle, skill: p.gameAcid },
    { href: '/games/formula-blaster', title: t.gamesHub.blasterTitle, skill: p.gameBlaster },
    { href: '/games/neutralise', title: t.gamesHub.neutraliseTitle, skill: p.gameNeutralise },
    { href: '/games/reaction-balancer', title: t.gamesHub.balancerTitle, skill: p.gameBalancer },
    { href: '/games/lewis-structures', title: t.gamesHub.lewisTitle, skill: p.gameLewis },
  ];

  const privacyLink = (
    <LocaleLink href={PRIVACY_PATH} className={INLINE_LINK_CLASS}>
      {p.privacyLinkLabel}
    </LocaleLink>
  );

  const exploreLink = (
    <LocaleLink href="/explore" className={INLINE_LINK_CLASS}>
      {p.exploreLinkLabel}
    </LocaleLink>
  );

  const collaborateLink = (
    <LocaleLink href="/teachers/collaborate" className={INLINE_LINK_CLASS}>
      {p.collaborateCtaLinkLabel}
    </LocaleLink>
  );

  const supportLink = supportUrl ? (
    <a
      href={supportUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 font-bold text-(--link) hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--link)"
    >
      {p.supportLinkLabel}
      <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      <span className="sr-only">{t.common.opensInNewTab}</span>
    </a>
  ) : null;

  return (
    <main className="min-h-screen bg-(--background) px-4 py-8 text-(--foreground) md:px-8">
      {/*
        `max-w-6xl`, matching the home page, not the `max-w-3xl` this page
        used before the two-column layout: with a sidebar to fill, the wider
        container means less vertical scrolling rather than longer lines. Line
        length is capped independently instead, with `max-w-[75ch]` on each
        block of prose (docs/TEACHERS_PAGE.md § 6's own guideline) — see the
        comment on `Section` below for why that could not stay implicit in the
        container width once the container grew.
      */}
      <div className="mx-auto max-w-6xl">
        <LocaleLink
          href="/"
          className="inline-flex min-h-6 items-center gap-2 py-1 text-sm font-bold text-(--muted) transition hover:text-(--link) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--link)"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden="true" /> {t.common.backToDashboard}
        </LocaleLink>

        <div className="mt-6">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-(--action) text-white">
              <GraduationCap className="h-5 w-5" aria-hidden="true" />
            </span>
            <h1 className="text-4xl font-black md:text-5xl">{p.heading}</h1>
          </div>
          <p className={`mt-2 max-w-[75ch] text-base text-(--muted) ${ADULT_PROSE}`}>{p.intro}</p>
        </div>

        {/*
          Two columns from `lg` up, single column below it — the reflow
          requirement in docs/TEACHERS_PAGE.md § 6 holds automatically rather
          than needing a second, narrower layout to maintain.

          The sidebar renders *first* in source order and is pushed right with
          `lg:order-2` rather than being written second and pulled left: DOM
          order is reading order and tab order for every reader, sighted or
          not, so Beta and Feedback — short, important, and easy to act on —
          come immediately after the intro for everyone, not only for the
          reader who can see them at the top of a visual sidebar. That also
          satisfies the **MUST** "visible without scrolling at desktop width"
          for the beta notice without needing it outside the grid the way it
          used to sit: it is simply the first thing in the document after the
          heading.

          `lg:sticky lg:top-20` on the sidebar: it is much shorter than the
          main column (three short cards against seven sections), and a grid
          track reserves its width for the *whole* row height regardless —
          without this, the sidebar's cards end a screen or two down and
          everything below them is just an empty 320px gutter on the right,
          which reads as a lopsided right margin rather than as a sidebar.
          Sticky keeps it in view alongside whatever section the reader has
          scrolled to instead. `top-20` clears the site header (measured at
          66px) with a little breathing room.
        */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px] lg:items-start">
          <div className="flex flex-col gap-6 lg:sticky lg:top-20 lg:order-2">
            <section
              aria-labelledby="teachers-beta"
              className="rounded-2xl border-2 border-(--border) bg-(--surface) p-6 shadow-md"
            >
              <h2
                id="teachers-beta"
                className="flex items-center gap-2 text-2xl font-black text-(--foreground)"
              >
                <Construction className="h-5 w-5 shrink-0 text-amber-500" aria-hidden="true" />
                {p.betaHeading}
              </h2>
              <p
                className={`mt-3 text-sm font-medium leading-relaxed text-(--muted) ${ADULT_PROSE}`}
              >
                {p.betaBody}
              </p>
            </section>

            <section
              aria-labelledby="teachers-feedback"
              className="rounded-2xl border-2 border-(--border) bg-(--surface) p-6 shadow-md"
            >
              <h2
                id="teachers-feedback"
                className="flex items-center gap-2 text-2xl font-black text-(--foreground)"
              >
                <MessageSquarePlus className="h-5 w-5 shrink-0 text-(--link)" aria-hidden="true" />
                {p.feedbackHeading}
              </h2>
              <div
                className={`mt-3 space-y-3 text-sm font-medium leading-relaxed text-(--muted) ${ADULT_PROSE}`}
              >
                <p>{p.feedbackBody1}</p>
                <p>{p.feedbackBody2}</p>
              </div>
            </section>

            <section
              aria-labelledby="teachers-collaborate"
              className="rounded-2xl border-2 border-(--border) bg-(--surface) p-6 shadow-md"
            >
              <h2
                id="teachers-collaborate"
                className="flex items-center gap-2 text-2xl font-black text-(--foreground)"
              >
                <Users className="h-5 w-5 shrink-0 text-(--link)" aria-hidden="true" />
                {p.collaborateHeading}
              </h2>
              {/*
                Only the pitch lives here. Everything about *how* to sign up —
                and the form itself — is one click away on its own page, which
                is what keeps this card sidebar-sized: docs/COLLABORATORS.md § 4
                now names that page rather than this section as where the form
                is mounted.
              */}
              <div
                className={`mt-3 space-y-3 text-sm font-medium leading-relaxed text-(--muted) ${ADULT_PROSE}`}
              >
                <p>{p.collaborateWhat}</p>
                <p className="font-bold text-(--foreground)">{p.collaborateThanks}</p>
                <p>{p.collaborateFreeNow}</p>
                <p>{withPlaceholder(p.collaborateCta, 'link', collaborateLink)}</p>
              </div>
            </section>
          </div>

          <article className="flex flex-col gap-6 rounded-2xl border-2 border-(--border) bg-(--surface) p-6 shadow-md md:p-8 lg:order-1">
            <Section icon={GraduationCap} title={p.whatHeading}>
              <p>{p.whatBody1}</p>
              <p>{p.whatBody2}</p>
              <p>{p.whatBody3}</p>
              {/*
                The case for the site — why it exists and how the games are
                meant to help — lives on the About page, not here. Shown only
                in a locale that has an About page; see src/i18n/about.ts.
              */}
              {about && (
                <p>
                  {withPlaceholder(
                    about.teachersPagePointer,
                    'link',
                    <LocaleLink href="/about" className={INLINE_LINK_CLASS}>
                      {about.teachersPagePointerLinkLabel}
                    </LocaleLink>
                  )}
                </p>
              )}
            </Section>

            <Section icon={Gamepad2} title={p.onSiteHeading}>
              <p>{p.gamesIntro}</p>
              <dl className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                {games.map((game) => (
                  <div key={game.href}>
                    <dt>
                      <LocaleLink
                        href={game.href}
                        className="inline-block py-1 font-bold text-(--link) hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--link)"
                      >
                        {game.title}
                      </LocaleLink>
                    </dt>
                    <dd>{game.skill}</dd>
                  </div>
                ))}
              </dl>
            </Section>

            <Section icon={BookMarked} title={p.sheetsHeading}>
              <p>{p.sheetsIntro}</p>
              <ul className="grid list-disc grid-cols-1 gap-x-6 gap-y-2 pl-5 sm:grid-cols-2">
                {sheets.map((sheet) => (
                  <li key={sheet.slug}>
                    <LocaleLink
                      href={`/cheat-sheets/${sheet.slug}`}
                      className="inline-block py-1 font-bold text-(--link) hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--link)"
                    >
                      {sheet.title}
                    </LocaleLink>
                  </li>
                ))}
              </ul>
            </Section>

            <Section icon={Compass} title={p.exploreHeading}>
              <p>{p.exploreBody1}</p>
              <p>{withPlaceholder(p.exploreBody2, 'link', exploreLink)}</p>
            </Section>

            <Section icon={Languages} title={p.languagesHeading}>
              <p>{p.languagesBody1}</p>
              <p>{p.languagesBody2}</p>
              <p>{p.languagesBody3}</p>
            </Section>

            <Section icon={ShieldCheck} title={p.privacyHeading}>
              <p>{p.privacyBody1}</p>
              <p>{p.privacyBody2}</p>
              <p>{withPlaceholder(p.privacyBody3, 'link', privacyLink)}</p>
            </Section>

            <Section icon={Accessibility} title={p.accessibilityHeading}>
              <p>{p.accessibilityBody1}</p>
              <p>{p.accessibilityBody2}</p>
              <p>{format(p.accessibilityBody3, gameNames)}</p>
              <p>{format(p.accessibilityBody4, gameNames)}</p>
            </Section>
          </article>
        </div>

        {/*
          Omitted entirely — heading and all — while NEXT_PUBLIC_SUPPORT_URL is
          unset, so the page shipped before the payment account existed. Full
          width below both columns: it is neither a pitch nor a status item,
          so neither column is the right home for it.
        */}
        {supportLink && (
          <div className="mt-6 rounded-2xl border-2 border-(--border) bg-(--surface) p-6 shadow-md md:p-8">
            <Section icon={HeartHandshake} title={p.supportHeading}>
              <p>{withPlaceholder(p.supportBody, 'link', supportLink)}</p>
            </Section>
          </div>
        )}
      </div>
    </main>
  );
}

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof GraduationCap;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-3 border-b border-(--border) pb-6 last:border-b-0 last:pb-0">
      <h2 className="flex items-center gap-2 text-2xl font-black text-(--foreground)">
        <Icon className="h-5 w-5 shrink-0 text-(--link)" aria-hidden="true" />
        {title}
      </h2>
      {/*
        `max-w-[75ch] lg:max-w-none`: the container grew to `max-w-6xl` to
        match the home page, but line length for justified prose should not
        grow with it — docs/TEACHERS_PAGE.md § 6's own guideline. The cap only
        applies below `lg`, where this column has no sidebar next to it yet
        and would otherwise span the full width. At `lg` and up the sidebar
        already narrows this column to well under 75ch on its own; capping it
        *again* left a ~110px gap of unused space on the right of every card,
        with nothing narrowing the left side to match — exactly the "text
        shifted left, invisible border on the right" look, measured and
        confirmed in the browser before this fix.
      */}
      <div
        className={`max-w-[75ch] lg:max-w-none space-y-3 text-sm font-medium leading-relaxed text-(--muted) ${ADULT_PROSE}`}
      >
        {children}
      </div>
    </section>
  );
}
