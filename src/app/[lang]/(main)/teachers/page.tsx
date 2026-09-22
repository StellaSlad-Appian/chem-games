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
//   - the copy for the collaborator sign-up form, which *is* in the catalogue
//     but is handed to `<CollaboratorForm>` as props. The form is a client
//     component and the catalogue is server-only: importing it there would put
//     this whole page's prose into the client bundle. See docs/COLLABORATORS.md
//     § 4 and the comment at the top of CollaboratorForm.tsx.
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
import { LocaleLink } from '@/components/layout/LocaleLink';
import { CollaboratorForm } from '@/components/teachers/CollaboratorForm';
import { getCheatSheets } from '@/i18n/cheat-sheets';
import { DEFAULT_LOCALE, isLocale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { teachersCopy } from '@/i18n/teachers';
import { format } from '@/i18n/format';

const PRIVACY_PATH = '/privacy';

/**
 * Where a collaborator writes to have their details deleted. The same address
 * the privacy page gives, deliberately: a person should not have to work out
 * which of two addresses their request belongs to. docs/COLLABORATORS.md § 0
 * requires the route to be stated on the form itself, not only in the policy,
 * which is why it is passed into the form rather than only linked from it.
 */
const CONTACT_EMAIL = 'stella.slad@gmail.com';

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
    <LocaleLink
      href={PRIVACY_PATH}
      className="font-bold text-(--link) hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--link)"
    >
      {p.privacyLinkLabel}
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
      <div className="mx-auto max-w-3xl">
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
          <p className="mt-2 max-w-[70ch] text-base text-(--muted)">{p.intro}</p>
        </div>

        {/*
          The beta notice is its own card immediately under the heading, not a
          section inside the article below, because the acceptance criteria
          require it to be visible without scrolling at desktop width. At 1280
          x 720 everything above it is about 160px tall.
        */}
        <section
          aria-labelledby="teachers-beta"
          className="mt-6 rounded-2xl border-2 border-(--border) bg-(--surface) p-6 shadow-md"
        >
          <h2
            id="teachers-beta"
            className="flex items-center gap-2 text-2xl font-black text-(--foreground)"
          >
            <Construction className="h-5 w-5 shrink-0 text-amber-500" aria-hidden="true" />
            {p.betaHeading}
          </h2>
          <p className="mt-3 max-w-[70ch] text-sm font-medium leading-relaxed text-(--muted)">
            {p.betaBody}
          </p>
        </section>

        <article className="mt-6 flex flex-col gap-6 rounded-2xl border-2 border-(--border) bg-(--surface) p-6 shadow-md md:p-8">
          <Section icon={GraduationCap} title={p.whatHeading}>
            <p>{p.whatBody1}</p>
            <p>{p.whatBody2}</p>
            <p>{p.whatBody3}</p>
          </Section>

          <Section icon={Gamepad2} title={p.onSiteHeading}>
            <p>{p.gamesIntro}</p>
            <dl className="space-y-3">
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

            <p className="flex items-start gap-2">
              <BookMarked
                className="mt-0.5 h-4 w-4 shrink-0 text-(--muted)"
                aria-hidden="true"
              />
              {p.sheetsIntro}
            </p>
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

          <Section icon={Users} title={p.collaborateHeading}>
            <p>{p.collaborateWhat}</p>
            <p>{p.collaborateCommitment}</p>
            <p className="font-bold text-(--foreground)">{p.collaborateThanks}</p>
            <p>{p.collaborateFreeNow}</p>
            <p>{p.collaborateHow}</p>
            <p>{p.collaborateReply}</p>
            <p>{p.collaborateRecords}</p>

            {/*
              The form's strings are read here, in the Server Component, and
              handed down. `CollaboratorForm` never imports the catalogue:
              doing so would put this page's whole prose into the client
              bundle. See docs/COLLABORATORS.md § 4 and
              src/i18n/teachers-boundary.test.ts.
            */}
            <CollaboratorForm
              contactEmail={CONTACT_EMAIL}
              copy={{
                heading: p.formHeading,
                intro: p.formIntro,
                use: p.formUse,
                deletion: p.formDelete,
                optional: p.formOptional,
                emailLabel: p.formEmailLabel,
                emailHelp: p.formEmailHelp,
                nameLabel: p.formNameLabel,
                schoolLabel: p.formSchoolLabel,
                countryLabel: p.formCountryLabel,
                yearLevelsLabel: p.formYearLevelsLabel,
                yearLevelsHelp: p.formYearLevelsHelp,
                subjectsLabel: p.formSubjectsLabel,
                subjectsHelp: p.formSubjectsHelp,
                messageLabel: p.formMessageLabel,
                messageHelp: p.formMessageHelp,
                submit: p.formSubmit,
                submitting: p.formSubmitting,
                successTitle: p.formSuccessTitle,
                successBody: p.formSuccessBody,
                genericError: p.formGenericError,
              }}
            />
          </Section>

          <Section icon={MessageSquarePlus} title={p.feedbackHeading}>
            <p>{p.feedbackBody1}</p>
            <p>{p.feedbackBody2}</p>
          </Section>

          {/*
            Omitted entirely — heading and all — while NEXT_PUBLIC_SUPPORT_URL
            is unset, so the page shipped before the payment account existed.
          */}
          {supportLink && (
            <Section icon={HeartHandshake} title={p.supportHeading}>
              <p>{withPlaceholder(p.supportBody, 'link', supportLink)}</p>
            </Section>
          )}
        </article>
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
      <div className="max-w-[70ch] space-y-3 text-sm font-medium leading-relaxed text-(--muted)">
        {children}
      </div>
    </section>
  );
}
