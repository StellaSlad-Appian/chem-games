// e2e/teachers.spec.ts
//
// Browser coverage for the "For Teachers" page (docs/TEACHERS_PAGE.md § 7).
// What only a real browser can show: that the footer link is the way in, that
// the beta notice is genuinely above the fold at desktop width, that the
// site-wide feedback button — the page's one call to action — is really there,
// and that nothing errors in the console.
//
// The copy itself is asserted against the dictionary rather than against
// literals, so rewording a string cannot silently break this file, and the
// unit test in src/app/[lang]/(main)/teachers/page.test.tsx is what covers the
// per-section detail.

import { expect, test, type ConsoleMessage, type Page } from '@playwright/test';
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

/**
 * Collects console errors and uncaught exceptions for the life of a page.
 *
 * Returns the array rather than asserting, so a test can act first and check
 * afterwards. Ignore-listing is deliberately empty: if something legitimate
 * ever needs to log an error here, that is a conversation, not a filter.
 */
function collectConsoleErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on('console', (message: ConsoleMessage) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(String(error)));
  return errors;
}

test.describe('For Teachers', () => {
  test('is reachable from the footer link, from an ordinary page', async ({ page }) => {
    await page.goto(path('/games'));

    const footerLink = page.locator('footer').getByRole('link', { name: en.footer.teachers });
    await expect(footerLink).toHaveAttribute('href', '/en/teachers');
    await footerLink.click();

    await expect(page).toHaveURL(/\/en\/teachers$/);
    await expect(
      page.getByRole('heading', { level: 1, name: enTeachers.heading })
    ).toBeVisible();
  });

  test('is not in the NavBar — the footer is the only way in', async ({ page }) => {
    await page.goto(path('/teachers'));
    await expect(page.locator('nav').getByRole('link', { name: en.footer.teachers })).toHaveCount(
      0
    );
  });

  test('shows the beta notice without scrolling at desktop width', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(path('/teachers'));

    const notice = page.getByRole('heading', { level: 2, name: enTeachers.betaHeading });
    await expect(notice).toBeVisible();

    // "Without scrolling" means the whole card, not just its heading, sits
    // inside the first viewport — and that nothing scrolled to get it there.
    const card = page.locator('section', { has: notice });
    const box = await card.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.y + box!.height).toBeLessThanOrEqual(720);
    expect(await page.evaluate(() => window.scrollY)).toBe(0);
    await expect(page.getByText(enTeachers.betaBody)).toBeVisible();
  });

  test('offers the site-wide feedback button as well as the sign-up form', async ({ page }) => {
    await page.goto(path('/teachers'));

    // This used to assert `main form` and `main input` were both absent: the
    // collaborator route *was* the feedback button, and a second form would
    // have been a duplicate. It is a form now (docs/COLLABORATORS.md), and
    // the feedback button stays for everything that is not volunteering.
    await expect(page.getByRole('button', { name: en.feedback.openA11y })).toBeVisible();
    await expect(page.locator('main form')).toHaveCount(1);
  });

  test.describe('the collaborator sign-up form', () => {
    // What these can and cannot show. The suite boots the app with no
    // Supabase credentials, so `createClient()` returns null and the action
    // answers `collaboratorUnconfigured` — no row is ever written here. What
    // is genuinely exercised is everything up to the database: the form
    // renders and labels its fields, the server action is reachable and runs,
    // the honeypot reaches it, validation happens *on the server* and comes
    // back in the page's language, and the result is announced to assistive
    // technology. The insert itself is untestable until the migration has
    // been run; see the note in docs/TESTING.md.

    const emailField = (page: Page) => labelled(page, enTeachers.formEmailLabel);

    /**
     * The form's own live region. Scoped to <main> because Next mounts its
     * route announcer as `role="alert"` on every page, so an unscoped
     * `getByRole('alert')` is a strict-mode violation rather than a miss.
     */
    const announcement = (page: Page) =>
      page.locator('main').getByRole('status').or(page.locator('main').getByRole('alert'));

    test('labels every field, and requires only the email address', async ({ page }) => {
      await page.goto(path('/teachers'));

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
      await page.goto(path('/teachers'));

      await expect(page.getByText(enTeachers.formUse)).toBeVisible();
      const mailto = page.locator('main a[href^="mailto:"]');
      await expect(mailto).toHaveCount(1);
      await expect(mailto).toBeVisible();
    });

    test('keeps the honeypot in the DOM, off-screen and out of the tab order', async ({ page }) => {
      await page.goto(path('/teachers'));

      const honeypot = page.locator('main input[name="website"]');
      await expect(honeypot).toHaveCount(1);
      await expect(honeypot).toHaveAttribute('tabindex', '-1');
      await expect(honeypot).toHaveAttribute('aria-hidden', 'true');
      // Present but not painted: a bot fills it, a person never sees it.
      await expect(honeypot).not.toBeInViewport();
    });

    test('fills and submits, and the server answers in the page language', async ({ page }) => {
      await page.goto(path('/teachers'));

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
      await page.goto(path('/teachers'));

      // The form carries `noValidate`, so the browser does not intercept: an
      // empty address really does reach the action, and the message that
      // comes back is the translated one, associated with the input.
      await page.getByRole('button', { name: enTeachers.formSubmit }).click();

      const alert = page.locator('main').getByRole('alert');
      await expect(alert).toHaveText(en.serverMessages.collaboratorEmailRequired);
      await expect(emailField(page)).toHaveAttribute('aria-invalid', 'true');

      const describedBy = await emailField(page).getAttribute('aria-describedby');
      const alertId = await alert.getAttribute('id');
      expect(describedBy?.split(' ')).toContain(alertId);
    });

    test('is in German on the German page, form and all', async ({ page }) => {
      await page.goto(path('/teachers', 'de'));

      await expect(
        page.getByRole('heading', { level: 3, name: deTeachers.formHeading })
      ).toBeVisible();
      await expect(labelled(page, deTeachers.formEmailLabel)).toBeVisible();
      await expect(page.getByRole('button', { name: deTeachers.formSubmit })).toBeVisible();
    });
  });

  test('links out to privacy, the games and the cheat sheets', async ({ page }) => {
    await page.goto(path('/teachers'));

    const main = page.locator('main');
    await expect(main.getByRole('link', { name: enTeachers.privacyLinkLabel })).toHaveAttribute(
      'href',
      '/en/privacy'
    );
    await expect(main.getByRole('link', { name: en.gamesHub.balancerTitle })).toHaveAttribute(
      'href',
      '/en/games/reaction-balancer'
    );
    await expect(main.getByRole('link', { name: 'Polyatomic Ions' })).toHaveAttribute(
      'href',
      '/en/cheat-sheets/polyatomic-ions'
    );
  });

  test('reflows to a 320px viewport with no horizontal scrolling', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto(path('/teachers'));
    await expect(
      page.getByRole('heading', { level: 1, name: enTeachers.heading })
    ).toBeVisible();

    // Asserted on the whole document, not just this page's <main>.
    //
    // It used to be scoped to <main>, because the shared NavBar overflowed a
    // 320px viewport by 33px: the English "Log in / Register" carried
    // `whitespace-nowrap` beside the language <select>, and /de/teachers did
    // not overflow because "Anmelden" is shorter. The mobile nav panel moved
    // those controls behind a menu button, so the header now fits, and this
    // was widened back as the old comment said to. Measured at 320px on
    // /en/teachers, /en and /en/games: zero overflow on all three.
    const overflow = await page.evaluate(() => {
      const root = document.documentElement;
      const limit = root.clientWidth;
      const offenders = [...document.querySelectorAll('body *')]
        // The sign-up form's honeypot lives at -9999px on purpose: it has to
        // be in the DOM for a bot to fill, and nowhere a person can reach. It
        // is 1px, transparent and aria-hidden, and a negative `left` cannot
        // produce horizontal scrolling in an LTR document, so it is exempt
        // rather than a finding. Nothing else is: the exemption names the one
        // element, not a class of them.
        .filter((el) => el.getAttribute('name') !== 'website')
        .filter((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.width === 0 && rect.height === 0) return false;
          return rect.right > limit + 0.5 || rect.left < -0.5;
        })
        .map((el) => `${el.tagName}.${String(el.className).slice(0, 60)}`);
      return {
        reason: '',
        overflows: root.scrollWidth > root.clientWidth || offenders.length > 0,
        offenders: offenders.slice(0, 5),
      };
    });

    expect(overflow.offenders).toEqual([]);
    expect(overflow.overflows).toBe(false);
  });

  test('logs nothing to the console', async ({ page }) => {
    const errors = collectConsoleErrors(page);

    await page.goto(path('/teachers'));
    await expect(
      page.getByRole('heading', { level: 1, name: enTeachers.heading })
    ).toBeVisible();
    // Give any client-side effect a chance to complain before we look.
    await expect(page.getByRole('button', { name: en.feedback.openA11y })).toBeVisible();

    expect(errors).toEqual([]);
  });
});
