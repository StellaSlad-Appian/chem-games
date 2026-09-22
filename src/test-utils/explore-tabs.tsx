// src/test-utils/explore-tabs.tsx
//
// Renders an Explore tab the way Next does: the `(tabs)` layout awaited, the
// tab's own page awaited and passed to it as `children`, the whole thing inside
// the providers the root layout supplies.
//
// Why compose rather than render the page alone: since the tab strip landed,
// the three claims most worth making about any of these pages are claims about
// the *document* — there is exactly one `<h1>`, the dateline appears once, the
// heading tree skips no level, the right pill is `aria-current`. None of them
// can be made about a page that renders section content only, and all of them
// are what a reader actually gets. A test that rendered the page on its own
// would be asserting the shape of half a document.
//
// The caller still has to mock `next/navigation` itself: `useSelectedLayoutSegment`
// needs an App Router context jsdom cannot provide, and `vi.mock` is scoped to
// the file that calls it. Each tab's test file declares its own, pinned to the
// segment that tab is served at.

import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { TestProviders } from './render';
import { DEFAULT_LOCALE, isLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import ExploreTabsLayout from '@/app/[lang]/(main)/explore/(tabs)/layout';

/** The shape every tab page under `(tabs)` has: async, props.params, no more. */
type TabPage = (props: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) => Promise<ReactElement>;

export async function renderExploreTab(Page: TabPage, lang: string = DEFAULT_LOCALE) {
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const dictionary = await getDictionary(locale);

  const params = Promise.resolve({ lang });
  const page = await Page({ params, searchParams: Promise.resolve({}) });
  const layout = await ExploreTabsLayout({ params, children: page });

  return render(
    // The provider gets the *same* locale as the page, not the default.
    // `LocaleLink` is a client component and reads its prefix from here, so a
    // German page inside an English provider produces `/en/...` hrefs — a test
    // artefact, but one that would quietly hide a real regression in any
    // locale-keeps-its-prefix assertion.
    <TestProviders locale={locale} dictionary={dictionary}>
      {layout}
    </TestProviders>
  );
}
