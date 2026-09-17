// src/app/[lang]/(main)/games/page.tsx
import { Beaker, FlaskConical, TestTube, Atom, Scale, Orbit } from 'lucide-react';
import { LocaleLink } from '@/components/layout/LocaleLink';
import { getDictionary } from '@/i18n/dictionaries';

export default async function GamesPage(props: PageProps<'/[lang]'>) {
  const { lang } = await props.params;
  const t = await getDictionary(lang);

  const games = [
    {
      href: '/games/acid-classification',
      title: t.gamesHub.acidTitle,
      description: t.gamesHub.acidDescription,
      Icon: Beaker,
    },
    {
      href: '/games/formula-blaster',
      title: t.gamesHub.blasterTitle,
      description: t.gamesHub.blasterDescription,
      Icon: FlaskConical,
    },
    {
      href: '/games/neutralise',
      title: t.gamesHub.neutraliseTitle,
      description: t.gamesHub.neutraliseDescription,
      Icon: TestTube,
    },
    {
      href: '/games/reaction-balancer',
      title: t.gamesHub.balancerTitle,
      description: t.gamesHub.balancerDescription,
      Icon: Scale,
    },
    {
      href: '/games/lewis-structures',
      title: t.gamesHub.lewisTitle,
      description: t.gamesHub.lewisDescription,
      Icon: Orbit,
    },
    {
      href: '/games/chemical-bonds',
      title: t.gamesHub.bondsTitle,
      description: t.gamesHub.bondsDescription,
      Icon: Atom,
    },
  ];

  return (
    <main className="min-h-screen bg-(--background) px-4 py-24 text-(--foreground)">
      <div className="mx-auto max-w-5xl">
        <LocaleLink href="/" className="text-sm font-bold text-blue-500 hover:underline">
          &larr; {t.common.dashboard}
        </LocaleLink>
        <h1 className="mt-5 text-4xl font-black">{t.gamesHub.heading}</h1>
        <p className="mt-2 text-muted">{t.gamesHub.intro}</p>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          {games.map(({ href, title, description, Icon }) => (
            <LocaleLink
              key={href}
              href={href}
              className="game-card p-6 transition hover:-translate-y-1 hover:border-blue-400"
            >
              <Icon className="h-8 w-8 text-blue-500" aria-hidden="true" />
              <h2 className="mt-5 text-2xl font-black">{title}</h2>
              <p className="mt-2 text-muted">{description}</p>
              <span className="mt-5 inline-block font-bold text-blue-500">
                {t.gamesHub.playNow}
              </span>
            </LocaleLink>
          ))}
        </div>
      </div>
    </main>
  );
}
