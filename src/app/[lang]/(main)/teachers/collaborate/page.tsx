// src/app/[lang]/(main)/teachers/collaborate/page.tsx
//
// The teacher-collaborator sign-up, one click from the For Teachers page
// rather than a section inside it. Acceptance criteria: docs/COLLABORATORS.md
// § 4, which used to say the form was "mounted by the For Teachers page in
// the collaborators section" and now names this route instead.
//
// Why it moved: this is the heaviest thing on that page — seven paragraphs of
// explanation plus a seven-field form — which made a two-column layout there
// unworkable (docs/TEACHERS_PAGE.md's own layout notes). The main page keeps
// a short pitch and a link; everything about *how* to sign up, and the form
// itself, lives here instead.
//
// Same shape as the page it split from: an async Server Component, copy read
// through `teachersCopy(locale)` — the same per-page catalogue, no new i18n
// architecture — and `generateMetadata` from its own two keys in that
// catalogue (`collaborateMetaTitle` / `collaborateMetaDescription`), the
// pattern src/i18n/about/en.ts already uses for its own metadata rather than
// adding to the shared dictionary.
//
// `<CollaboratorForm>` itself needed no changes beyond an optional
// `headingLevel` prop: it already takes every string as a prop and knows
// nothing about routing. It renders `headingLevel={2}` here because this
// page's own `h1` is the only thing above it — on the main page, the form
// sits inside a `Section`'s `h2`, so it stays at its default `h3` there.

import type { Metadata } from 'next';
import { ArrowLeft, Users } from 'lucide-react';
import { ADULT_PROSE, NOT_PROSE } from '@/components/layout/adult-prose';
import { LocaleLink } from '@/components/layout/LocaleLink';
import { CollaboratorForm } from '@/components/teachers/CollaboratorForm';
import { DEFAULT_LOCALE, isLocale } from '@/i18n/config';
import { teachersCopy } from '@/i18n/teachers';

/**
 * Where a collaborator writes to have their details deleted. The same address
 * the privacy page gives, deliberately: a person should not have to work out
 * which of two addresses their request belongs to. docs/COLLABORATORS.md § 0
 * requires the route to be stated on the form itself, not only in the policy,
 * which is why it is passed into the form rather than only linked from it.
 */
const CONTACT_EMAIL = 'stella.slad@gmail.com';

export async function generateMetadata(
  props: PageProps<'/[lang]/teachers/collaborate'>
): Promise<Metadata> {
  const { lang } = await props.params;
  const locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const p = teachersCopy(locale);
  return {
    title: p.collaborateMetaTitle,
    description: p.collaborateMetaDescription,
  };
}

export default async function TeachersCollaboratePage(
  props: PageProps<'/[lang]/teachers/collaborate'>
) {
  const { lang } = await props.params;
  const locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const p = teachersCopy(locale);

  return (
    <main className="min-h-screen bg-(--background) px-4 py-8 text-(--foreground) md:px-8">
      <div className="mx-auto max-w-3xl">
        <LocaleLink
          href="/teachers"
          className="inline-flex min-h-6 items-center gap-2 py-1 text-sm font-bold text-(--muted) transition hover:text-(--link) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--link)"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden="true" /> {p.backToTeachers}
        </LocaleLink>

        <div className="mt-6 flex items-center gap-2">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-(--action) text-white">
            <Users className="h-5 w-5" aria-hidden="true" />
          </span>
          <h1 className="text-4xl font-black md:text-5xl">{p.collaborateHeading}</h1>
        </div>

        <article className="mt-6 flex flex-col gap-6 rounded-2xl border-2 border-(--border) bg-(--surface) p-6 shadow-md md:p-8">
          <div className={`space-y-3 text-sm font-medium leading-relaxed text-(--muted) ${ADULT_PROSE}`}>
            <p>{p.collaborateWhat}</p>
            <p>{p.collaborateCommitment}</p>
            <p className="font-bold text-(--foreground)">{p.collaborateThanks}</p>
            <p>{p.collaborateFreeNow}</p>
            <p>{p.collaborateHow}</p>
            <p>{p.collaborateReply}</p>
            <p>{p.collaborateRecords}</p>
          </div>

          {/*
            The form's strings are read here, in the Server Component, and
            handed down. `CollaboratorForm` never imports the catalogue: doing
            so would put this page's whole prose into the client bundle. See
            docs/COLLABORATORS.md § 4 and src/i18n/teachers-boundary.test.ts.
          */}
          <div className={NOT_PROSE}>
            <CollaboratorForm
              headingLevel={2}
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
          </div>
        </article>
      </div>
    </main>
  );
}
