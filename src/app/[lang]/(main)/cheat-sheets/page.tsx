// src/app/[lang]/(main)/cheat-sheets/page.tsx
import { ArrowLeft, BookMarked } from 'lucide-react';
import { CheatSheetGrid } from '@/components/cheat-sheets/CheatSheetGrid';
import { LocaleLink } from '@/components/layout/LocaleLink';
import { getCheatSheets } from '@/i18n/cheat-sheets';
import { getDictionary } from '@/i18n/dictionaries';
import { DEFAULT_LOCALE, isLocale } from '@/i18n/config';

export default async function CheatSheetsPage(props: PageProps<'/[lang]'>) {
  const { lang } = await props.params;
  const locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const t = await getDictionary(locale);
  const sheets = getCheatSheets(locale);

  return (
    <main className="min-h-screen bg-(--background) text-(--foreground) px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Navigation back */}
        <LocaleLink
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-muted transition hover:text-(--link)"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden="true" /> {t.common.backToDashboard}
        </LocaleLink>

        {/* Header */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="icon-tile bg-(--info-surface) text-(--link)">
                <BookMarked className="h-5 w-5" aria-hidden="true" />
              </span>
              <h1 className="text-4xl font-black md:text-5xl">{t.cheatSheets.heading}</h1>
            </div>
            <p className="mt-2 text-base text-muted">{t.cheatSheets.intro}</p>
          </div>
        </div>

        <CheatSheetGrid sheets={sheets} />
      </div>
    </main>
  );
}
