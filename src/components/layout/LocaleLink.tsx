// src/components/layout/LocaleLink.tsx
'use client';

import Link from 'next/link';
import type { ComponentProps } from 'react';
import { useI18n } from '@/i18n/client';

type LinkProps = ComponentProps<typeof Link>;

/**
 * `next/link` with the active locale prefixed onto app-relative paths.
 *
 * Every internal link in the app goes through this instead of writing
 * `/${lang}/games` at each call site. Threading `lang` by hand through forty
 * links is exactly the kind of change where one gets missed, and a missed one
 * is not a crash — it is a link that silently drops the reader back into
 * English. Paths are still written the way the routes are named (`/games`,
 * `/profile/edit`), which keeps them greppable.
 *
 * External URLs, anchors and the unprefixed route handlers are passed through
 * untouched by `localizePath`.
 */
export function LocaleLink({ href, ...rest }: LinkProps) {
  const { href: localize } = useI18n();

  const localized =
    typeof href === 'string' && href.startsWith('/') ? localize(href) : href;

  return <Link href={localized} {...rest} />;
}
