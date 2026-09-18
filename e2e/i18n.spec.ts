// e2e/i18n.spec.ts
//
// Browser coverage for the parts of the i18n system that only exist at the
// HTTP/navigation layer: the proxy's redirect and negotiation, the cookie that
// remembers a choice, the switcher, and that German actually renders on one
// page of each type (hub, game, cheat sheet).
//
// The unit tests in src/i18n and src/proxy.test.ts cover the logic; what these
// add is that the pieces are wired together in a real request.

import { expect, test, type Page } from '@playwright/test';
import { en } from '../src/i18n/dictionaries/en';
import { de } from '../src/i18n/dictionaries/de';
import { fr } from '../src/i18n/dictionaries/fr';
import { LOCALE_COOKIE } from '../src/i18n/config';
import { lewisMessages } from '../src/i18n/game-messages/lewis-structures';
import { reactionBalancerMessages } from '../src/i18n/game-messages/reaction-balancer';
import { languageSwitcher, openGame, path, waitForHydration } from './helpers';

const htmlLang = (page: Page) => page.locator('html').getAttribute('lang');

test.describe('locale redirect', () => {
  test('an unprefixed URL lands on a prefixed one', async ({ page }) => {
    await page.goto('/games');
    await expect(page).toHaveURL(/\/en\/games$/);
    await expect(page.getByRole('heading', { level: 1, name: en.gamesHub.heading })).toBeVisible();
  });

  test('the root redirects too', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\/en$/);
  });

  test('the query string survives the redirect', async ({ page }) => {
    await page.goto('/auth?error=verification');
    await expect(page).toHaveURL(/\/en\/auth\?error=verification$/);
    // The error code is translated on arrival rather than carried as prose.
    await expect(page.getByText(en.auth.errorVerification)).toBeVisible();
  });

  test('an unknown first segment 404s instead of being treated as a locale', async ({ page }) => {
    const response = await page.goto('/not-a-locale/games');
    expect(response?.status()).toBe(404);
  });
});

test.describe('Accept-Language negotiation', () => {
  test('a German browser is sent to the German site', async ({ browser }) => {
    const context = await browser.newContext({ locale: 'de-DE' });
    const page = await context.newPage();
    await page.goto('/games');

    await expect(page).toHaveURL(/\/de\/games$/);
    await expect(page.getByRole('heading', { level: 1, name: de.gamesHub.heading })).toBeVisible();
    expect(await htmlLang(page)).toBe('de');

    await context.close();
  });

  test('a regional variant resolves to its base language', async ({ browser }) => {
    const context = await browser.newContext({ locale: 'de-AT' });
    const page = await context.newPage();
    await page.goto('/games');
    await expect(page).toHaveURL(/\/de\/games$/);
    await context.close();
  });

  test('a language we do not publish falls back to English', async ({ browser }) => {
    const context = await browser.newContext({ locale: 'ja-JP' });
    const page = await context.newPage();
    await page.goto('/games');
    await expect(page).toHaveURL(/\/en\/games$/);
    await context.close();
  });

  test('an explicit cookie beats the browser language', async ({ browser }) => {
    const context = await browser.newContext({ locale: 'de-DE' });
    await context.addCookies([
      { name: LOCALE_COOKIE, value: 'en', url: 'http://localhost' },
    ]);
    const page = await context.newPage();
    await page.goto('/games');
    await expect(page).toHaveURL(/\/en\/games$/);
    await context.close();
  });
});

test.describe('html lang', () => {
  test('matches the locale in the URL', async ({ page }) => {
    await page.goto(path('/games'));
    expect(await htmlLang(page)).toBe('en');

    await page.goto(path('/games', 'de'));
    expect(await htmlLang(page)).toBe('de');
  });

  test('is set on a game page too, not just the marketing pages', async ({ page }) => {
    await page.goto(path('/games/reaction-balancer', 'de'));
    await expect(page.locator('main.game-shell')).toBeVisible();
    expect(await htmlLang(page)).toBe('de');
  });
});

test.describe('hreflang alternates', () => {
  test('every locale is advertised, plus x-default', async ({ page }) => {
    await page.goto(path('/games'));

    const hreflangs = await page
      .locator('link[rel="alternate"][hreflang]')
      .evaluateAll((links) => links.map((link) => link.getAttribute('hreflang')));

    expect(hreflangs).toEqual(expect.arrayContaining(['en', 'de', 'fr', 'x-default']));
  });

  test('the canonical points at the locale being viewed', async ({ page }) => {
    await page.goto(path('/games', 'de'));
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toContain('/de');
  });
});

test.describe('language switcher', () => {
  test('moves the reader to the same page in the other language', async ({ page }) => {
    await page.goto(path('/cheat-sheets'));
    await expect(
      page.getByRole('heading', { level: 1, name: en.cheatSheets.heading })
    ).toBeVisible();

    const select = await languageSwitcher(page, en.language.label);
    await select.selectOption('de');

    await expect(page).toHaveURL(/\/de\/cheat-sheets$/);
    await expect(
      page.getByRole('heading', { level: 1, name: de.cheatSheets.heading })
    ).toBeVisible();
  });

  test('is reachable and operable from the keyboard', async ({ page }) => {
    await page.goto(path('/games'));
    const select = await languageSwitcher(page, en.language.label);

    await select.focus();
    await expect(select).toBeFocused();
    await select.selectOption('de');
    await expect(page).toHaveURL(/\/de\/games$/);
  });

  test('remembers the choice for a later visit to an unprefixed URL', async ({ page }) => {
    await page.goto(path('/games'));
    await (await languageSwitcher(page, en.language.label)).selectOption('de');
    await expect(page).toHaveURL(/\/de\/games$/);

    // A bookmark, a shared link, or just typing the bare domain.
    await page.goto('/cheat-sheets');
    await expect(page).toHaveURL(/\/de\/cheat-sheets$/);
  });

  test('is available inside a game, where there is no nav bar', async ({ page }) => {
    // Through openGame(), so the game's first-visit instructions modal is
    // already dismissed — otherwise its backdrop swallows the footer click.
    await openGame(page, 'reaction-balancer');

    await page.locator('footer').getByTitle(en.games.shared.settings).click();
    await expect(page.getByLabel(en.language.label)).toBeVisible();
  });
});

test.describe('German rendering', () => {
  test('the hub', async ({ page }) => {
    await page.goto(path('/games', 'de'));
    await expect(page.getByRole('heading', { level: 1, name: de.gamesHub.heading })).toBeVisible();
    await expect(page.getByText(de.gamesHub.intro)).toBeVisible();
    await expect(
      page.getByRole('link', { name: new RegExp(de.gamesHub.neutraliseTitle) })
    ).toBeVisible();
  });

  test('a game, including its instructions modal', async ({ page }) => {
    await page.goto(path('/games/acid-classification', 'de'));
    await expect(page.locator('main.game-shell')).toBeVisible();

    // Header, footer and the classification vessels.
    await expect(page.getByText(de.games.acidClassification.task)).toBeVisible();
    await expect(
      page.getByRole('button', { name: de.chemistry.acid, exact: true })
    ).toBeVisible();

    await page.locator('footer').getByTitle(de.games.shared.howToPlay).click();
    await expect(
      page.getByRole('heading', { name: de.games.acidClassification.instructionsTitle })
    ).toBeVisible();
    await page.getByRole('button', { name: de.games.shared.gotIt }).click();
  });

  test('a cheat sheet, with its formulae left untranslated', async ({ page }) => {
    await page.goto(path('/cheat-sheets/acids-and-bases', 'de'));

    await expect(page.getByRole('heading', { level: 1, name: 'Säuren und Basen' })).toBeVisible();
    await expect(page.getByText(de.cheatSheets.keyConcepts)).toBeVisible();
    await expect(page.getByText(de.cheatSheets.watchOutFor)).toBeVisible();

    // Compound names are translated ("Hydrochloric acid" -> "Salzsäure")…
    await expect(page.getByText('Salzsäure (stark)')).toBeVisible();
    // …while the formulae they label are not.
    await expect(page.locator('body')).toContainText('NaOH');
    await expect(page.locator('body')).toContainText('CH3COOH');
  });

  test('the game overlay', async ({ page }) => {
    await openGame(page, 'reaction-balancer', { locale: 'de' });

    await page.locator('footer').getByTitle(de.games.shared.pause).click();
    const dialog = page.getByRole('dialog', { name: de.games.overlay.pausedTitle });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('link', { name: de.games.overlay.quitToHub })).toHaveAttribute(
      'href',
      '/de/games'
    );
  });
});

test.describe('auth under a locale prefix', () => {
  test('the sign-in page renders in German and links stay prefixed', async ({ page }) => {
    await page.goto(path('/auth', 'de'));

    await expect(page.getByRole('heading', { name: de.auth.loginTitle })).toBeVisible();
    await expect(page.getByLabel(de.auth.email)).toBeVisible();
    await expect(page.getByRole('link', { name: de.auth.backToGames })).toHaveAttribute(
      'href',
      '/de'
    );
  });

  test('switching to register keeps the locale', async ({ page }) => {
    await page.goto(path('/auth', 'de'));
    await page.getByRole('button', { name: de.auth.switchToRegisterAction }).click();
    await expect(page.getByRole('heading', { name: de.auth.registerTitle })).toBeVisible();
    await expect(page).toHaveURL(/\/de\/auth$/);
  });

  test('the OAuth callback keeps its unprefixed URL', async ({ page }) => {
    // No code and no Supabase credentials, so it takes the configuration
    // branch — what matters here is that the route still exists at the URL
    // registered with Supabase and sends the reader to a localized page.
    const response = await page.goto('/auth/callback', { waitUntil: 'commit' });
    expect(response?.url()).not.toContain('/en/auth/callback');
    await expect(page).toHaveURL(/\/(en|de)\/auth\?error=/);
  });
});

// ---------------------------------------------------------------------------
// The two games whose copy lives in a message catalogue
// ---------------------------------------------------------------------------
//
// These are the ones where nothing else would catch a regression. The copy is
// assembled at runtime from the dictionary by
// `lewisMessages()` / `reactionBalancerMessages()`, and it is threaded through
// a rules hook, a canvas and a glossary matcher before it reaches the page — so
// a key that resolves but is never rendered, or a name that is translated in
// the coach line and left English on the card, both compile and both pass the
// unit tests. Seeing the German on screen is the check.

const lewisDe = lewisMessages(de, 'de');
const balancerDe = reactionBalancerMessages(de, 'de');

test.describe('German rendering: Share to Fill', () => {
  test('the header, the coach and the canvas all name the molecule in German', async ({ page }) => {
    await openGame(page, 'lewis-structures', { locale: 'de' });
    await expect(page).toHaveURL(/\/de\/games\/lewis-structures$/);
    expect(await htmlLang(page)).toBe('de');

    // Molecule and element names come from the chemistry-names overlay, not the
    // dictionary, so this is the seam between the two that has to hold.
    await expect(page.getByText(lewisDe.header.build('Wasserstoff', 'H2'))).toBeVisible();
    await expect(page.getByText(lewisDe.header.progress(1, 3))).toBeVisible();
    // The game word for an unpaired outer electron. German mirrors English's
    // two tiers: 'Einzelelektron' here and in every hint, 'ungepaartes Elektron'
    // as the formal gloss in the glossary, 'einzeln' on the dot itself.
    await expect(page.getByTestId('coach-panel')).toContainText('Einzelelektron');

    // The formula itself is never translated.
    await expect(page.getByLabel(lewisDe.ui.canvasLabel('Wasserstoff'))).toBeVisible();
  });

  test('the instructions modal and its glossary are German', async ({ page }) => {
    await openGame(page, 'lewis-structures', { locale: 'de', showLewisIntro: true });

    await expect(
      page.getByRole('heading', { name: lewisDe.instructions.title })
    ).toBeVisible();
    await expect(page.getByText(lewisDe.instructions.lead)).toBeVisible();
    await expect(page.getByText(lewisDe.instructions.glossaryTitle)).toBeVisible();

    // Tap-to-explain is matched against German word forms, so a German term
    // must be present as a button and open a German definition.
    await page.getByRole('button', { name: 'freies Elektronenpaar' }).first().click();
    await expect(page.getByRole('tooltip')).toContainText('nicht geteilt');

    // Escape closes the pop-over and leaves the modal open: GlossaryTerm takes
    // the key in the capture phase and calls stopImmediatePropagation(), so the
    // modal's own window listener never sees it.
    await page.keyboard.press('Escape');
    await expect(page.getByRole('tooltip')).toBeHidden();
    await expect(
      page.getByRole('heading', { name: lewisDe.instructions.title })
    ).toBeVisible();

    await page.getByRole('button', { name: de.games.shared.gotIt }).click();
    await expect(page.getByRole('heading', { name: lewisDe.instructions.title })).toBeHidden();
  });

  test('a shared pair announces itself in German and the round locks', async ({ page }) => {
    await openGame(page, 'lewis-structures', { locale: 'de' });
    await waitForHydration(page);

    const loner = (atomId: string) =>
      page
        .locator(`[data-atom-id="${atomId}"]`)
        .getByRole('button', { name: /Einzelelektron \d+ von \d+/ })
        .first();

    await loner('a0').click();
    await loner('a1').click();

    await expect(page.getByTestId('round-complete')).toContainText(
      lewisDe.success.round('Wasserstoff', 'H-H')
    );
    await expect(page.getByRole('button', { name: lewisDe.ui.nextMolecule })).toBeVisible();
  });
});

test.describe('German rendering: Reaction Balancer', () => {
  test('the ledger, the cards and the coach are German, and the equation is not', async ({ page }) => {
    await openGame(page, 'reaction-balancer', { locale: 'de' });
    await expect(page).toHaveURL(/\/de\/games\/reaction-balancer$/);

    await expect(page.getByText(balancerDe.header.balance('Wasser-Synthese'))).toBeVisible();

    // Element names in the ledger come from the chemistry-names overlay.
    const oxygenRow = page.locator('[data-testid="ledger-row"][data-element="O"]');
    await expect(oxygenRow).toContainText('Sauerstoff');
    await expect(oxygenRow).toContainText(balancerDe.ledger.needsMore(1, 'right'));
    await expect(page.getByTestId('coach-panel')).toContainText(
      balancerDe.coach.imbalance('Sauerstoff', 2, 1)
    );

    // Species names on the cards come from the same overlay…
    await expect(
      page.getByLabel(balancerDe.card.coefficient('Wasser', 'H2O'), { exact: true })
    ).toBeVisible();
    // …and the formulae on them are international notation, untouched.
    await expect(page.locator('[data-testid="compound-card"][data-formula="H2O"]')).toBeVisible();
  });

  test('balancing it through announces and locks in German', async ({ page }) => {
    await openGame(page, 'reaction-balancer', { locale: 'de' });
    await waitForHydration(page);

    const card = (formula: string) =>
      page.locator(`[data-testid="compound-card"][data-formula="${formula}"]`);
    await card('H2O').getByRole('button', { name: balancerDe.card.increase('Wasser') }).click();
    await card('H2').getByRole('button', { name: balancerDe.card.increase('Wasserstoff') }).click();

    // Locking replaces the coach strip with the round-complete card. The
    // equation inside it is typeset by MoleculeText, so only the label around
    // it is plain text to assert on.
    await expect(page.getByTestId('round-complete')).toContainText(balancerDe.success.label);
    await expect(page.getByRole('button', { name: balancerDe.ui.nextReaction })).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// French
// ---------------------------------------------------------------------------
//
// One page of each type, plus both games whose copy lives in a catalogue. The
// unit gates prove completeness; this proves the wiring — that the locale is
// negotiated, that `<html lang>` follows it, and that the French actually
// reaches the screen through the RSC payload, the chemistry-name overlay and
// the glossary matcher.

/**
 * A matcher for a dictionary string that tolerates whichever space survives.
 *
 * French typography puts U+202F before `;` `!` `?` and U+00A0 before `:`, and
 * accessible-name computation is only specified to collapse ASCII whitespace —
 * so whether a no-break space reaches an accessible name intact is a browser
 * detail, not something this suite should pin down. The pattern is still built
 * from the dictionary, so a retitled string still updates the test.
 */
const looseText = (value: string) =>
  new RegExp(
    value
      .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      .replace(/[\s  ]+/g, '[\\s\\u00A0\\u202F]+')
  );

test.describe('French negotiation and routing', () => {
  test('a French browser is sent to the French site', async ({ browser }) => {
    const context = await browser.newContext({ locale: 'fr-FR' });
    const page = await context.newPage();
    await page.goto('/games');

    await expect(page).toHaveURL(/\/fr\/games$/);
    await expect(page.getByRole('heading', { level: 1, name: fr.gamesHub.heading })).toBeVisible();
    expect(await htmlLang(page)).toBe('fr');

    await context.close();
  });

  test('a regional variant resolves to its base language', async ({ browser }) => {
    const context = await browser.newContext({ locale: 'fr-CA' });
    const page = await context.newPage();
    await page.goto('/cheat-sheets');
    await expect(page).toHaveURL(/\/fr\/cheat-sheets$/);
    await context.close();
  });

  test('the switcher moves the reader to French and remembers it', async ({ page }) => {
    await page.goto(path('/games'));
    await (await languageSwitcher(page, en.language.label)).selectOption('fr');
    await expect(page).toHaveURL(/\/fr\/games$/);

    // A bookmark, a shared link, or just typing the bare domain.
    await page.goto('/cheat-sheets');
    await expect(page).toHaveURL(/\/fr\/cheat-sheets$/);
  });

  test('html lang is set on a game page too, not just the marketing pages', async ({ page }) => {
    await page.goto(path('/games/reaction-balancer', 'fr'));
    await expect(page.locator('main.game-shell')).toBeVisible();
    expect(await htmlLang(page)).toBe('fr');
  });
});

test.describe('French rendering', () => {
  test('the hub', async ({ page }) => {
    await page.goto(path('/games', 'fr'));
    await expect(page.getByRole('heading', { level: 1, name: fr.gamesHub.heading })).toBeVisible();
    await expect(page.getByText(fr.gamesHub.intro)).toBeVisible();
    await expect(
      page.getByRole('link', { name: looseText(fr.gamesHub.balancerTitle) })
    ).toBeVisible();
  });

  test('a game, including its instructions modal', async ({ page }) => {
    await page.goto(path('/games/acid-classification', 'fr'));
    await expect(page.locator('main.game-shell')).toBeVisible();

    await expect(page.getByText(fr.games.acidClassification.subtitle)).toBeVisible();
    await expect(page.getByRole('button', { name: fr.chemistry.acid, exact: true })).toBeVisible();

    await page.locator('footer').getByTitle(fr.games.shared.howToPlay).click();
    await expect(
      page.getByRole('heading', { name: looseText(fr.games.acidClassification.instructionsTitle) })
    ).toBeVisible();
    await page.getByRole('button', { name: fr.games.shared.gotIt }).click();
  });

  test('the cheat-sheet index, including its category and year-level labels', async ({ page }) => {
    // Phase 1 shipped category pills still rendering in English, and looking is
    // what caught it — so this asserts a label of each kind, not just the page.
    await page.goto(path('/cheat-sheets', 'fr'));
    await expect(
      page.getByRole('heading', { level: 1, name: fr.cheatSheets.heading })
    ).toBeVisible();
    await expect(page.getByText(fr.cheatSheetCategories.Fundamentals).first()).toBeVisible();
    await expect(page.getByText(fr.yearLevels['Year 9'], { exact: true }).first()).toBeVisible();
  });

  test('a cheat sheet, with its formulae left untranslated', async ({ page }) => {
    await page.goto(path('/cheat-sheets/acids-and-bases', 'fr'));

    await expect(page.getByRole('heading', { level: 1, name: 'Acides et bases' })).toBeVisible();
    await expect(page.getByText(fr.cheatSheets.keyConcepts)).toBeVisible();
    await expect(page.getByText(fr.cheatSheets.watchOutFor)).toBeVisible();

    // Compound names are translated ("Hydrochloric acid" -> "Acide chlorhydrique")…
    await expect(page.getByText('Acide chlorhydrique (fort)')).toBeVisible();
    // …while the formulae they label are not.
    await expect(page.locator('body')).toContainText('NaOH');
    await expect(page.locator('body')).toContainText('CH3COOH');
  });

  test('the game overlay', async ({ page }) => {
    await openGame(page, 'reaction-balancer', { locale: 'fr' });

    await page.locator('footer').getByTitle(fr.games.shared.pause).click();
    const dialog = page.getByRole('dialog', { name: fr.games.overlay.pausedTitle });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('link', { name: fr.games.overlay.quitToHub })).toHaveAttribute(
      'href',
      '/fr/games'
    );
  });

  test('the sign-in page renders in French and links stay prefixed', async ({ page }) => {
    await page.goto(path('/auth', 'fr'));

    await expect(page.getByRole('heading', { name: looseText(fr.auth.loginTitle) })).toBeVisible();
    await expect(page.getByLabel(fr.auth.email)).toBeVisible();
    await expect(page.getByRole('link', { name: fr.auth.backToGames })).toHaveAttribute(
      'href',
      '/fr'
    );
  });
});

const lewisFr = lewisMessages(fr, 'fr');
const balancerFr = reactionBalancerMessages(fr, 'fr');

test.describe('French rendering: Partage et complète', () => {
  test('the header, the coach and the canvas all name the molecule in French', async ({ page }) => {
    await openGame(page, 'lewis-structures', { locale: 'fr' });
    await expect(page).toHaveURL(/\/fr\/games\/lewis-structures$/);
    expect(await htmlLang(page)).toBe('fr');

    // French names the *substance* differently from the *element*: H is
    // hydrogène, H2 is dihydrogène. This is the seam between the catalogue and
    // the chemistry-name overlay, and it is where that distinction shows up.
    await expect(page.getByText(looseText(lewisFr.header.build('dihydrogène', 'H2')))).toBeVisible();
    await expect(page.getByText(looseText(lewisFr.header.progress(1, 3)))).toBeVisible();
    // The game word for an unpaired outer electron. French mirrors English's
    // two tiers with its own pair: 'solitaire' here and in every hint,
    // 'électron célibataire' as the formal gloss, 'seul' on the dot itself.
    await expect(page.getByTestId('coach-panel')).toContainText('solitaire');

    await expect(page.getByLabel(looseText(lewisFr.ui.canvasLabel('dihydrogène')))).toBeVisible();
  });

  test('the instructions modal and its glossary are French', async ({ page }) => {
    await openGame(page, 'lewis-structures', { locale: 'fr', showLewisIntro: true });

    await expect(
      page.getByRole('heading', { name: looseText(lewisFr.instructions.title) })
    ).toBeVisible();
    await expect(page.getByText(lewisFr.instructions.lead)).toBeVisible();
    await expect(page.getByText(lewisFr.instructions.glossaryTitle)).toBeVisible();

    // Tap-to-explain is matched against French word forms. This is the check
    // that matters most for French: the matcher uses a JavaScript \b, which
    // only knows ASCII letters, so any term starting with "é" would silently
    // never open its pop-over — which is why the French match words are
    // "externes" and "célibataires" rather than the full phrases.
    await page.getByRole('button', { name: 'doublet non liant' }).first().click();
    await expect(page.getByRole('tooltip')).toContainText('partagés');

    await page.keyboard.press('Escape');
    await expect(page.getByRole('tooltip')).toBeHidden();

    await page.getByRole('button', { name: fr.games.shared.gotIt }).click();
    await expect(
      page.getByRole('heading', { name: looseText(lewisFr.instructions.title) })
    ).toBeHidden();
  });

  test('a shared pair announces itself in French and the round locks', async ({ page }) => {
    await openGame(page, 'lewis-structures', { locale: 'fr' });
    await waitForHydration(page);

    const loner = (atomId: string) =>
      page
        .locator(`[data-atom-id="${atomId}"]`)
        .getByRole('button', { name: /solitaire \d+ sur \d+/ })
        .first();

    await loner('a0').click();
    await loner('a1').click();

    await expect(page.getByTestId('round-complete')).toContainText(
      looseText(lewisFr.success.round('Dihydrogène', 'H-H'))
    );
    await expect(page.getByRole('button', { name: lewisFr.ui.nextMolecule })).toBeVisible();
  });
});

test.describe('French rendering: La balance des atomes', () => {
  test('the ledger, the cards and the coach are French, and the equation is not', async ({
    page,
  }) => {
    await openGame(page, 'reaction-balancer', { locale: 'fr' });
    await expect(page).toHaveURL(/\/fr\/games\/reaction-balancer$/);

    await expect(
      page.getByText(looseText(balancerFr.header.balance('Synthèse de l’eau')))
    ).toBeVisible();

    // Element names in the ledger come from the chemistry-names overlay.
    const oxygenRow = page.locator('[data-testid="ledger-row"][data-element="O"]');
    await expect(oxygenRow).toContainText('Oxygène');
    await expect(oxygenRow).toContainText(balancerFr.ledger.needsMore(1, 'right'));
    await expect(page.getByTestId('coach-panel')).toContainText(
      looseText(balancerFr.coach.imbalance('Oxygène', 2, 1))
    );

    // Species names on the cards come from the same overlay…
    await expect(page.getByLabel(looseText(balancerFr.card.coefficient('Eau', 'H2O')))).toBeVisible();
    // …and the formulae on them are international notation, untouched.
    await expect(page.locator('[data-testid="compound-card"][data-formula="H2O"]')).toBeVisible();
  });

  test('balancing it through announces and locks in French', async ({ page }) => {
    await openGame(page, 'reaction-balancer', { locale: 'fr' });
    await waitForHydration(page);

    const card = (formula: string) =>
      page.locator(`[data-testid="compound-card"][data-formula="${formula}"]`);
    await card('H2O')
      .getByRole('button', { name: looseText(balancerFr.card.increase('Eau')) })
      .click();
    await card('H2')
      .getByRole('button', { name: looseText(balancerFr.card.increase('Dihydrogène')) })
      .click();

    await expect(page.getByTestId('round-complete')).toContainText(balancerFr.success.label);
    await expect(page.getByRole('button', { name: balancerFr.ui.nextReaction })).toBeVisible();
  });
});
