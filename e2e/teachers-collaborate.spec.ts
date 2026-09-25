// e2e/teachers-collaborate.spec.ts
//
// Browser coverage for the teacher-collaborator sign-up page,
// /teachers/collaborate — split out of e2e/teachers.spec.ts when the form
// moved off the main For Teachers page (docs/TEACHERS_PAGE.md's layout
// notes; docs/COLLABORATORS.md § 4 names this page as where the form is
// mounted now).
//
// What these can and cannot show. The suite boots the app with no Supabase
// credentials, so `createClient()` returns null and the action answers
// `collaboratorUnconfigured` — no row is ever written here. What is genuinely
// exercised is everything up to the database: the form renders and labels its
// fields, the server action is reachable and runs, the honeypot reaches it,
// validation happens *on the server* and comes back in the page's language,
// and the result is announced to assistive technology. The insert itself is
// untestable until the migration has been run; see the note in
// docs/TESTING.md.

import { expect, test, type Page } from '@playwright/test';
import { en } from '../src/i18n/dictionaries/en';
import { en as enTeachers } from '../src/i18n/teachers/en';
import { de as deTeachers } from '../src/i18n/teachers/de';
import { path } from './helpers';

/** Escapes a copy string so it can go inside a RegExp built at runtime. */
const escapeForRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * A form field, found by the start of its label.
 *
 * Not `{ exact: true }`: every optional field's `<label>` ends with the word
 * "(optional)", so its accessible name is "Your name (optional)" and an exact
 * match finds nothing at all. Anchoring at the start keeps each match
 * unambiguous without hard-coding that suffix into every call.
 */
const labelled = (page: Page, label: string) =>
  page.getByLabel(new RegExp(`^${escapeForRegExp(label)}`));

const emailField = (page: Page) => labelled(page, enTeachers.formEmailLabel);

/**
 * The form's own live region. Scoped to <main> because Next mounts its route
 * announcer as `role="alert"` on every page, so an unscoped `getByRole('alert')`
 * is a strict-mode violation rather than a miss.
 */
const announcement = (page: Page) =>
  page.locator('main').getByRole('status').or(page.locator('main').getByRole('alert'));

test.describe('The teacher-collaborator sign-up page', () => {
  test('is reachable from the For Teachers page', async ({ page }) => {
    await page.goto(path('/teachers'));
    await page
      .getByRole('link', { name: new RegExp(enTeachers.collaborateCtaLinkLabel, 'i') })
      .click();
    await expect(page).toHaveURL(/\/en\/teachers\/collaborate$/);
    await expect(
      page.getByRole('heading', { level: 1, name: enTeachers.collaborateHeading })
    ).toBeVisible();
  });

  test('renders the form heading at h2, since its own h1 is the only thing above it', async ({
    page,
  }) => {
    await page.goto(path('/teachers/collaborate'));
    await expect(
      page.getByRole('heading', { level: 2, name: enTeachers.formHeading })
    ).toBeVisible();
  });

  test('labels every field, and requires only the email address', async ({ page }) => {
    await page.goto(path('/teachers/collaborate'));

    for (const label of [
      enTeachers.formEmailLabel,
      enTeachers.formNameLabel,
      enTeachers.formSchoolLabel,
      enTeachers.formCountryLabel,
      enTeachers.formYearLevelsLabel,
      enTeachers.formSubjectsLabel,
      enTeachers.formMessageLabel,
    ]) {
      await expect(labelled(page, label)).toBeVisible();
    }

    await expect(emailField(page)).toHaveJSProperty('required', true);
    await expect(labelled(page, enTeachers.formSchoolLabel)).toHaveJSProperty('required', false);
  });

  test('says what the address is for and how to be deleted without an account', async ({
    page,
  }) => {
    await page.goto(path('/teachers/collaborate'));

    await expect(page.getByText(enTeachers.formUse)).toBeVisible();
    const mailto = page.locator('main a[href^="mailto:"]');
    await expect(mailto).toHaveCount(1);
    await expect(mailto).toBeVisible();
  });

  test('keeps the honeypot in the DOM, off-screen and out of the tab order', async ({ page }) => {
    await page.goto(path('/teachers/collaborate'));

    const honeypot = page.locator('main input[name="website"]');
    await expect(honeypot).toHaveCount(1);
    await expect(honeypot).toHaveAttribute('tabindex', '-1');
    await expect(honeypot).toHaveAttribute('aria-hidden', 'true');
    // Present but not painted: a bot fills it, a person never sees it.
    await expect(honeypot).not.toBeInViewport();
  });

  test('fills and submits, and the server answers in the page language', async ({ page }) => {
    await page.goto(path('/teachers/collaborate'));

    await emailField(page).fill('teacher@school.edu.au');
    await labelled(page, enTeachers.formNameLabel).fill('Alex Reid');
    await labelled(page, enTeachers.formSchoolLabel).fill('Northside High');
    await labelled(page, enTeachers.formYearLevelsLabel).fill('Year 9 and Year 10');
    await page.getByRole('button', { name: enTeachers.formSubmit }).click();

    // Without credentials the action cannot store anything, so the honest
    // assertion is that it ran and said so — not that a row exists.
    const answer = announcement(page);
    await expect(answer).toBeVisible();
    await expect(answer).toHaveText(
      new RegExp(
        `${escapeForRegExp(enTeachers.formSuccessTitle)}|${escapeForRegExp(en.serverMessages.collaboratorUnconfigured)}`
      )
    );
  });

  test('validates on the server and ties the error to the field', async ({ page }) => {
    await page.goto(path('/teachers/collaborate'));

    // The form carries `noValidate`, so the browser does not intercept: an
    // empty address really does reach the action, and the message that comes
    // back is the translated one, associated with the input.
    await page.getByRole('button', { name: enTeachers.formSubmit }).click();

    const alert = page.locator('main').getByRole('alert');
    await expect(alert).toHaveText(en.serverMessages.collaboratorEmailRequired);
    await expect(emailField(page)).toHaveAttribute('aria-invalid', 'true');

    const describedBy = await emailField(page).getAttribute('aria-describedby');
    const alertId = await alert.getAttribute('id');
    expect(describedBy?.split(' ')).toContain(alertId);
  });

  test('is in German on the German page, form and all', async ({ page }) => {
    await page.goto(path('/teachers/collaborate', 'de'));

    await expect(
      page.getByRole('heading', { level: 2, name: deTeachers.formHeading })
    ).toBeVisible();
    await expect(labelled(page, deTeachers.formEmailLabel)).toBeVisible();
    await expect(page.getByRole('button', { name: deTeachers.formSubmit })).toBeVisible();
  });
});
