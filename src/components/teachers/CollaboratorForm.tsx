'use client';

// src/components/teachers/CollaboratorForm.tsx
//
// The teacher collaborator sign-up, on the For Teachers page.
// Acceptance criteria: docs/COLLABORATORS.md § 4.
//
// **Every string this renders arrives as a prop.** It does not import
// `@/i18n/teachers`, and it must not: that catalogue is the whole For Teachers
// page's prose, about 8 KB per locale, and it is server-only precisely so that
// it never reaches a browser. One `import` from this file would put all of it
// into the client bundle and quietly undo the move documented in
// docs/i18n/README.md § "The dictionary is a budget, and a game will eat it".
// The page is an async Server Component; it reads `teachersCopy(locale)` and
// hands the two dozen strings below down. `src/i18n/teachers-boundary.test.ts`
// fails the build if any 'use client' module reaches for the catalogue.
//
// The form pattern — a plain onSubmit handler calling the server action, an
// off-screen honeypot, a disabled-while-in-flight submit button — is
// FeedbackWidget's, which works. What is different here is that this form has
// seven fields and therefore needs per-field error association: the action
// returns which field it rejected, and that field gets `aria-invalid` and an
// `aria-describedby` pointing at the message.

import { useId, useRef, useState } from 'react';
import { Send, Users } from 'lucide-react';
import { submitCollaboratorAction } from '@/lib/actions/collaborator';
import {
  COLLABORATOR_COUNTRY_MAX_LENGTH,
  COLLABORATOR_EMAIL_MAX_LENGTH,
  COLLABORATOR_MESSAGE_MAX_LENGTH,
  COLLABORATOR_NAME_MAX_LENGTH,
  COLLABORATOR_SCHOOL_MAX_LENGTH,
  COLLABORATOR_SUBJECTS_MAX_LENGTH,
  COLLABORATOR_YEAR_LEVELS_MAX_LENGTH,
  type CollaboratorField,
} from '@/lib/validation/collaborator';

/**
 * Exactly the strings this component renders, and nothing else.
 *
 * Spelled out as its own interface rather than `Pick<TeachersCopy, …>` so that
 * this file has no reason at all — not even a type-only one — to name the
 * server-only catalogue. The page does the mapping, which is also the place
 * where a missing string is a compile error.
 */
export interface CollaboratorFormCopy {
  heading: string;
  intro: string;
  use: string;
  /** Interpolates {email}; the address becomes a mailto link. */
  deletion: string;
  optional: string;

  emailLabel: string;
  emailHelp: string;
  nameLabel: string;
  schoolLabel: string;
  countryLabel: string;
  yearLevelsLabel: string;
  yearLevelsHelp: string;
  subjectsLabel: string;
  subjectsHelp: string;
  messageLabel: string;
  messageHelp: string;

  submit: string;
  submitting: string;
  successTitle: string;
  successBody: string;
  genericError: string;
}

export interface CollaboratorFormProps {
  copy: CollaboratorFormCopy;
  /** Where a deletion request goes. Stated on the form, not only in the policy. */
  contactEmail: string;
  /**
   * The form's own heading is a level below whatever section wraps it: `h3`
   * under the For Teachers page's `Section` (an `h2`), `h2` on its own
   * `/teachers/collaborate` page, where the page's `h1` is the only thing
   * above it. Defaults to 3, the original and still most common case.
   */
  headingLevel?: 2 | 3;
}

/** The text fields, in tab order. `email` is handled separately: it is the only required one. */
const OPTIONAL_TEXT_FIELDS = [
  { field: 'name', max: COLLABORATOR_NAME_MAX_LENGTH, autoComplete: 'name' },
  { field: 'school', max: COLLABORATOR_SCHOOL_MAX_LENGTH, autoComplete: 'organization' },
  { field: 'country', max: COLLABORATOR_COUNTRY_MAX_LENGTH, autoComplete: 'country-name' },
  { field: 'yearLevels', max: COLLABORATOR_YEAR_LEVELS_MAX_LENGTH, autoComplete: 'off' },
  { field: 'subjects', max: COLLABORATOR_SUBJECTS_MAX_LENGTH, autoComplete: 'off' },
] as const satisfies ReadonlyArray<{
  field: Exclude<CollaboratorField, 'email' | 'message'>;
  max: number;
  autoComplete: string;
}>;

/** Every field is text; `CollaboratorField` is already exactly that set. */
type TextField = CollaboratorField;

const EMPTY: Record<TextField, string> = {
  email: '',
  name: '',
  school: '',
  country: '',
  yearLevels: '',
  subjects: '',
  message: '',
};

// `min-h-11` is 44px: docs/ACCESSIBILITY.md § Pointer & touch wants ≥ 24×24
// always and ≥ 44×44 on touch, and an input tall enough for a thumb is not
// worse for a mouse, so this does not branch on `useInputMethod()`.
const INPUT_CLASS =
  'w-full min-h-11 rounded-xl border border-(--border-strong) bg-(--surface) px-3 py-2 text-sm text-(--foreground) outline-none transition focus-visible:border-(--link) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--link) aria-[invalid=true]:border-(--danger)';

export function CollaboratorForm({ copy, contactEmail, headingLevel = 3 }: CollaboratorFormProps) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3';
  const formId = useId();
  const [values, setValues] = useState<Record<TextField, string>>(EMPTY);
  // Honeypot: people never see or fill this field, bots do.
  const [website, setWebsite] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorField, setErrorField] = useState<CollaboratorField | null>(null);
  // Focus moves to the confirmation once the sign-up lands, so a keyboard or
  // screen-reader user is not left at the bottom of a form that vanished.
  const successRef = useRef<HTMLDivElement>(null);

  const id = (name: string) => `${formId}-${name}`;
  const errorId = id('error');

  const set = (field: TextField) => (event: { target: { value: string } }) =>
    setValues((previous) => ({ ...previous, [field]: event.target.value }));

  const describedBy = (field: CollaboratorField, helpId?: string) =>
    [helpId, errorField === field ? errorId : null].filter(Boolean).join(' ') || undefined;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage(null);
    setErrorField(null);

    const result = await submitCollaboratorAction({ ...values, website });

    setIsSubmitting(false);

    if (result.success) {
      setSubmitted(true);
      // The form is replaced by the confirmation rather than cleared and left
      // standing: it is a once-per-person form, and offering it again invites
      // the double sign-up the unique index exists to absorb.
      requestAnimationFrame(() => successRef.current?.focus());
      return;
    }

    setErrorMessage(result.error || copy.genericError);
    setErrorField(result.field ?? null);
  };

  const headingId = id('heading');

  // Built here rather than inside the map so the object is not rebuilt per
  // field, and so a missing label is a type error at one obvious place.
  const optionalLabels: Record<(typeof OPTIONAL_TEXT_FIELDS)[number]['field'], string> = {
    name: copy.nameLabel,
    school: copy.schoolLabel,
    country: copy.countryLabel,
    yearLevels: copy.yearLevelsLabel,
    subjects: copy.subjectsLabel,
  };

  if (submitted) {
    return (
      <section
        aria-labelledby={headingId}
        className="rounded-xl border border-(--border) bg-(--surface-2) p-5"
      >
        <Heading id={headingId} className="sr-only">
          {copy.heading}
        </Heading>
        <div
          ref={successRef}
          role="status"
          tabIndex={-1}
          className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--link)"
        >
          <p className="text-sm font-bold text-(--success)">{copy.successTitle}</p>
          <p className="mt-2 text-sm font-medium leading-relaxed text-(--muted)">
            {copy.successBody}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      aria-labelledby={headingId}
      className="rounded-xl border border-(--border) bg-(--surface-2) p-5"
    >
      <Heading
        id={headingId}
        className="flex items-center gap-2 text-lg font-black text-(--foreground)"
      >
        <Users className="h-4 w-4 shrink-0 text-(--link)" aria-hidden="true" />
        {copy.heading}
      </Heading>

      <p className="mt-2 text-sm font-medium leading-relaxed text-(--muted)">{copy.intro}</p>
      <p className="mt-2 text-sm font-medium leading-relaxed text-(--muted)">{copy.use}</p>
      <p className="mt-2 text-sm font-medium leading-relaxed text-(--muted)">
        <DeletionSentence template={copy.deletion} email={contactEmail} />
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-5 flex flex-col gap-4">
        <Field
          id={id('email')}
          label={copy.emailLabel}
          help={copy.emailHelp}
          helpId={id('email-help')}
        >
          <input
            id={id('email')}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            maxLength={COLLABORATOR_EMAIL_MAX_LENGTH}
            value={values.email}
            onChange={set('email')}
            aria-invalid={errorField === 'email' || undefined}
            aria-describedby={describedBy('email', id('email-help'))}
            className={INPUT_CLASS}
          />
        </Field>

        {OPTIONAL_TEXT_FIELDS.map(({ field, max, autoComplete }) => {
          const help =
            field === 'yearLevels'
              ? copy.yearLevelsHelp
              : field === 'subjects'
                ? copy.subjectsHelp
                : undefined;
          return (
            <Field
              key={field}
              id={id(field)}
              label={optionalLabels[field]}
              optional={copy.optional}
              help={help}
              helpId={help ? id(`${field}-help`) : undefined}
            >
              <input
                id={id(field)}
                name={field}
                type="text"
                autoComplete={autoComplete}
                maxLength={max}
                value={values[field]}
                onChange={set(field)}
                aria-invalid={errorField === field || undefined}
                aria-describedby={describedBy(field, help ? id(`${field}-help`) : undefined)}
                className={INPUT_CLASS}
              />
            </Field>
          );
        })}

        <Field
          id={id('message')}
          label={copy.messageLabel}
          optional={copy.optional}
          help={copy.messageHelp}
          helpId={id('message-help')}
        >
          <textarea
            id={id('message')}
            name="message"
            rows={3}
            maxLength={COLLABORATOR_MESSAGE_MAX_LENGTH}
            value={values.message}
            onChange={set('message')}
            aria-invalid={errorField === 'message' || undefined}
            aria-describedby={describedBy('message', id('message-help'))}
            className={`${INPUT_CLASS} resize-y`}
          />
        </Field>

        {/*
          Honeypot. Kept in the DOM (no display:none) so automated submitters
          fill it, but moved off-screen, skipped by the tab order and hidden
          from assistive technology. The FeedbackWidget pattern, verbatim.
        */}
        <input
          type="text"
          name="website"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
          autoComplete="off"
          tabIndex={-1}
          aria-hidden="true"
          className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden opacity-0"
        />

        {errorMessage && (
          <p id={errorId} role="alert" className="text-sm font-bold text-(--danger)">
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary flex min-h-11 items-center justify-center gap-2 text-sm disabled:opacity-50"
        >
          {isSubmitting ? (
            copy.submitting
          ) : (
            <>
              <Send className="h-4 w-4 shrink-0" aria-hidden="true" /> {copy.submit}
            </>
          )}
        </button>
      </form>
    </section>
  );
}

/**
 * A labelled row. `<label for>` with a real `<label>` element, never a
 * placeholder standing in for one: a placeholder disappears the moment
 * somebody types, which is exactly when they need to know what the field was.
 */
function Field({
  id,
  label,
  optional,
  help,
  helpId,
  children,
}: {
  id: string;
  label: string;
  optional?: string;
  help?: string;
  helpId?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-bold text-(--foreground)">
        {label}
        {optional && (
          <span className="ml-1.5 text-xs font-medium text-(--muted)">({optional})</span>
        )}
      </label>
      {help && (
        <p id={helpId} className="text-xs font-medium text-(--muted)">
          {help}
        </p>
      )}
      {children}
    </div>
  );
}

/**
 * The deletion sentence, with the address rendered as a `mailto:` link.
 *
 * Split on a `{email}` placeholder rather than concatenated, so each locale
 * decides where in the sentence the address goes — the same rule the privacy
 * and For Teachers pages follow. If a translation loses the placeholder the
 * sentence still renders, minus the link, rather than showing a reader the
 * literal "{email}".
 */
function DeletionSentence({ template, email }: { template: string; email: string }) {
  const parts = template.split('{email}');
  if (parts.length < 2) return <>{template}</>;
  return (
    <>
      {parts[0]}
      <a
        href={`mailto:${email}`}
        className="font-bold text-(--link) hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--link)"
      >
        {email}
      </a>
      {parts.slice(1).join('{email}')}
    </>
  );
}
