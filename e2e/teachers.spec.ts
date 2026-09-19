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
import { path } from './helpers';

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

  test('offers the site-wide feedback button, and no second form of its own', async ({ page }) => {
    await page.goto(path('/teachers'));

    // The collaborator route is this button; the page must not duplicate it.
    await expect(page.getByRole('button', { name: en.feedback.openA11y })).toBeVisible();
    await expect(page.locator('main form')).toHaveCount(0);
    await expect(page.locator('main input')).toHaveCount(0);
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

    // Scoped to this page's own <main>, deliberately, rather than to the
    // document. At 320px the shared NavBar already overflows by 33px — the
    // English "Log in / Register" carries `whitespace-nowrap` and sits beside
    // the language <select> — and it does so on /en/privacy and every other
    // page too, not just this one. /de/teachers does not overflow at all,
    // because "Anmelden" is shorter, which is what identifies the cause. That
    // is a real WCAG 1.4.10 defect on the NavBar and `fix/mobile-nav` is in
    // flight for it; asserting the whole document here would make this page's
    // test the one that fails for it. **If the nav is fixed, widen this back
    // to documentElement** — the page passes that assertion today.
    const overflow = await page.evaluate(() => {
      const main = document.querySelector('main');
      if (!main) return { reason: 'no main', overflows: true, offenders: [] as string[] };
      const limit = document.documentElement.clientWidth;
      const offenders = [...main.querySelectorAll('*')]
        .filter((el) => {
          const rect = el.getBoundingClientRect();
          return rect.right > limit + 0.5 || rect.left < -0.5;
        })
        .map((el) => `${el.tagName}.${String(el.className).slice(0, 60)}`);
      return {
        reason: '',
        overflows: main.scrollWidth > main.clientWidth || offenders.length > 0,
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
