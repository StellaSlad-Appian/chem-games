// e2e/cheat-sheet-atomic-structure.spec.ts
//
// The periodic-table widget in a real browser, where the three things a
// component test cannot see actually happen: focus, layout and the cascade.
//
// Note what these assert on. `toBeVisible()` is satisfied by a non-empty
// bounding box and knows nothing about a clipping ancestor — a spec on this
// repo once passed against content that was clipped out of the page. So reflow
// is asserted on `document.documentElement.scrollWidth`, and contrast on the
// colours the browser actually computed with `data-theme` forced, not on the
// OS setting.

import { expect, test } from '@playwright/test';
import { path } from './helpers';

const SHEET = '/cheat-sheets/atomic-structure';
const cell = (symbol: string) => `[data-symbol="${symbol}"]`;

/** WCAG relative luminance and contrast, over an `rgb(...)` string. */
const CONTRAST = `
  (a, b) => {
    const parse = (s) => s.match(/\\d+/g).slice(0, 3).map(Number);
    const lum = (rgb) => {
      const [r, g, bl] = rgb.map((v) => {
        const c = v / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * r + 0.7152 * g + 0.0722 * bl;
    };
    const [x, y] = [lum(parse(a)), lum(parse(b))].sort((p, q) => q - p);
    return (x + 0.05) / (y + 0.05);
  }
`;

test.describe('the periodic table on the atomic-structure sheet', () => {
  test('renders all 118 elements in one semantic table', async ({ page }) => {
    await page.goto(path(SHEET));
    await expect(page.locator('[data-testid="element-cell"]')).toHaveCount(118);

    const table = page.getByRole('table', {
      name: 'The periodic table — all 118 elements, arranged by atomic number',
    });
    await expect(table).toBeAttached();
    await expect(table.getByRole('columnheader', { name: 'Group 17' })).toBeAttached();
    await expect(table.getByRole('rowheader', { name: 'Period 3' })).toBeAttached();
  });

  test('reaches sodium by keyboard alone and reads its arrangement', async ({ page }) => {
    await page.goto(path(SHEET));
    // Wait for hydration: until the island has mounted, the cells carry no
    // handlers and every key press below would go nowhere.
    await expect(page.locator(cell('Na'))).toHaveAttribute('tabindex', '0');

    // Tab from the top of the document until the table's single tab stop has
    // focus. The count is the assertion as much as the loop is: if the table
    // ever grows a second tab stop this still arrives, but the check below
    // that exactly one cell is tabbable fails.
    await page.keyboard.press('Tab');
    for (let i = 0; i < 40; i++) {
      const onACell = await page.evaluate(
        () => document.activeElement?.getAttribute('data-testid') === 'element-cell'
      );
      if (onACell) break;
      await page.keyboard.press('Tab');
    }
    await expect(page.locator('[data-testid="element-cell"][tabindex="0"]')).toHaveCount(1);
    expect(await page.evaluate(() => document.activeElement?.getAttribute('data-symbol'))).toBe(
      'Na'
    );

    // Arrow away and back, so the path to sodium is navigation and not the
    // default selection.
    await page.keyboard.press('ArrowUp');
    expect(await page.evaluate(() => document.activeElement?.getAttribute('data-symbol'))).toBe(
      'Li'
    );
    await page.keyboard.press('ArrowDown');
    expect(await page.evaluate(() => document.activeElement?.getAttribute('data-symbol'))).toBe(
      'Na'
    );

    await page.keyboard.press('Enter');
    const panel = page.getByTestId('element-detail');
    await expect(panel).toContainText('Sodium');
    await expect(panel).toContainText('2, 8, 1');
    // The panel announces; it does not take the focus (AC-6).
    await expect(panel).toHaveAttribute('aria-live', 'polite');
    expect(await page.evaluate(() => document.activeElement?.getAttribute('data-symbol'))).toBe(
      'Na'
    );
  });

  test('scrolls the grid at 320px without scrolling the page', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto(path(SHEET));
    await expect(page.locator(cell('Na'))).toBeAttached();

    const measured = await page.evaluate(() => {
      const grid = document
        .querySelector('[data-symbol="Na"]')!
        .closest('div.overflow-x-auto') as HTMLElement;
      return {
        viewport: window.innerWidth,
        documentScrollWidth: document.documentElement.scrollWidth,
        gridClientWidth: grid.clientWidth,
        gridScrollWidth: grid.scrollWidth,
      };
    });

    // AC-7. The page does not scroll sideways...
    expect(measured.documentScrollWidth).toBeLessThanOrEqual(measured.viewport);
    // ...and the grid does, which is the 1.4.10 exemption being used.
    expect(measured.gridScrollWidth).toBeGreaterThan(measured.gridClientWidth);
  });

  test('meets 4.5:1 for cell text in both themes, in every mode', async ({ page }) => {
    await page.goto(path(SHEET));
    await expect(page.locator(cell('Na'))).toBeAttached();

    for (const theme of ['light', 'dark'] as const) {
      // Forced, not inherited from the OS: the assertion is about the theme
      // named, and a machine that prefers the other one would otherwise make
      // this test pass by testing the same theme twice.
      await page.evaluate((value) => document.documentElement.setAttribute('data-theme', value), theme);

      const modes = page.locator('button[aria-pressed]:not([data-symbol])');
      const count = await modes.count();
      for (let i = 0; i < count; i++) {
        await modes.nth(i).click();
        const worst = await page.evaluate(
          ([contrastSource]) => {
            const contrast = eval(contrastSource) as (a: string, b: string) => number;
            const cells = [...document.querySelectorAll('[data-testid="element-cell"]')];
            return Math.min(
              ...cells.map((node) => {
                const style = getComputedStyle(node);
                return contrast(style.backgroundColor, style.color);
              })
            );
          },
          [CONTRAST]
        );
        expect(worst, `${theme} / mode ${i}`).toBeGreaterThanOrEqual(4.5);
      }
    }
  });

  test('prints a text badge in every cell in every mode', async ({ page }) => {
    await page.goto(path(SHEET));
    await expect(page.locator(cell('Na'))).toBeAttached();

    const modes = page.locator('button[aria-pressed]:not([data-symbol])');
    await expect(modes).toHaveCount(6);

    for (let i = 0; i < 6; i++) {
      await modes.nth(i).click();
      const empty = await page.evaluate(() =>
        [...document.querySelectorAll('[data-testid="element-cell"]')].filter(
          (node) => (node.lastElementChild?.textContent ?? '').trim() === ''
        ).length
      );
      expect(empty, `mode ${i}`).toBe(0);
      await expect(page.getByTestId('periodic-table-legend')).toBeVisible();
    }
  });

  test('greys the d-block in the outer-shell mode instead of naming a count', async ({ page }) => {
    await page.goto(path(SHEET));
    await expect(page.locator(cell('Na'))).toBeAttached();
    await page.getByRole('button', { name: 'Outer shell', exact: true }).click();

    await expect(page.locator(cell('Na'))).toContainText('1');
    // AC-14: iron does not have two outer electrons, and the cell must not
    // say a number at all.
    await expect(page.locator(cell('Fe'))).toContainText('—');
    await expect(page.getByTestId('periodic-table-legend')).toContainText(
      'Not a simple count at this level'
    );
  });

  test('shows Cyrillic names and a decimal comma in Russian', async ({ page }) => {
    await page.goto(path(SHEET, 'ru'));
    await expect(page.locator(cell('Cl'))).toBeAttached();

    // AC-27/AC-28. The symbol stays Latin, which is what Russian chemistry
    // does; the name and the mass do not.
    await expect(page.locator(cell('Cl'))).toContainText('35,45');
    await expect(page.locator(cell('Cl'))).toContainText('Cl');
    await expect(page.locator(cell('Na'))).toHaveAttribute('aria-label', /Натрий/);

    const pageScroll = await page.evaluate(() => ({
      width: document.documentElement.scrollWidth,
      viewport: window.innerWidth,
    }));
    expect(pageScroll.width).toBeLessThanOrEqual(pageScroll.viewport);
  });

  test('does not carry the twenty-element lookup table any more', async ({ page }) => {
    await page.goto(path(SHEET));
    // On the heading, not on the text. `getByText` matches a substring
    // case-insensitively, and the prose above the widget still says "then 8
    // again for the first twenty elements" — which is a sentence about the
    // pattern, not a reference to the table that was deleted.
    await expect(
      page.getByRole('heading', { name: 'The first twenty elements' })
    ).toHaveCount(0);
    // The one lookup table that stays.
    await expect(
      page.getByRole('heading', { name: 'The three subatomic particles' })
    ).toBeVisible();
  });
});

test.describe('the periodic table on the isotopes sheet', () => {
  test('is gated to two modes and links back to the Year 9 sheet', async ({ page }) => {
    await page.goto(path('/cheat-sheets/isotopes-and-radioactivity'));
    await expect(page.locator('[data-testid="element-cell"]')).toHaveCount(118);

    const modes = page.locator('button[aria-pressed]:not([data-symbol])');
    await expect(modes).toHaveCount(2);
    await expect(page.getByRole('button', { name: 'Natural or made' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Families' })).toHaveCount(0);

    await expect(
      page.getByRole('link', { name: 'All six views of the table are on the Year 9 sheet' })
    ).toHaveAttribute('href', path('/cheat-sheets/atomic-structure'));
  });

  test('marks the made elements', async ({ page }) => {
    await page.goto(path('/cheat-sheets/isotopes-and-radioactivity'));
    await expect(page.locator(cell('U'))).toBeAttached();
    await expect(page.locator(cell('U'))).toContainText('nat');
    await expect(page.locator(cell('Og'))).toContainText('lab');
  });
});
