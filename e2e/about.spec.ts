// e2e/about.spec.ts
//
// Browser coverage for the About page. What only a real browser shows: that
// the footer link is the way in, that the page and the For Teachers page link
// to each other, and that — while the page is English-only — a translated
// locale has neither the page nor a link to it. The per-section detail is in
// src/app/[lang]/(main)/about/page.test.tsx.

import { expect, test, type ConsoleMessage } from '@playwright/test';
import { de } from '../src/i18n/dictionaries/de';
import { en } from '../src/i18n/dictionaries/en';
import { en as enAbout } from '../src/i18n/about/en';
import { en as enTeachers } from '../src/i18n/teachers/en';
import { path } from './helpers';

test.describe('About', () => {
  test('is reachable from the footer, and renders without console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (message: ConsoleMessage) => {
      if (message.type() === 'error') errors.push(message.text());
    });
    page.on('pageerror', (error) => errors.push(String(error)));

    await page.goto(path('/games'));
    const footerLink = page.locator('footer').getByRole('link', { name: enAbout.footerLabel });
    await expect(footerLink).toHaveAttribute('href', '/en/about');
    await footerLink.click();

    await expect(page).toHaveURL(/\/en\/about$/);
    await expect(page.getByRole('heading', { level: 1, name: enAbout.heading })).toBeVisible();
    await expect(page).toHaveTitle(enAbout.metaTitle);
    expect(errors).toEqual([]);
  });

  test('links to For Teachers, which links back', async ({ page }) => {
    await page.goto(path('/about'));
    await page.locator('main').getByRole('link', { name: en.footer.teachers }).click();
    await expect(page.getByRole('heading', { level: 1, name: enTeachers.heading })).toBeVisible();

    await page
      .locator('main')
      .getByRole('link', { name: enAbout.teachersPagePointerLinkLabel, exact: true })
      .click();
    await expect(page.getByRole('heading', { level: 1, name: enAbout.heading })).toBeVisible();
  });

  test('is not offered in German: no footer link, and the route is a 404', async ({ page }) => {
    await page.goto(path('/games', 'de'));
    await expect(page.locator('footer').getByRole('link', { name: de.footer.teachers })).toBeVisible();
    await expect(page.locator('footer a[href="/de/about"]')).toHaveCount(0);

    const response = await page.goto(path('/about', 'de'));
    expect(response?.status()).toBe(404);
  });
});
