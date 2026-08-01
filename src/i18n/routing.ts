// i18n/routing.ts
import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'de'],
 
  // Used when no locale matches
  defaultLocale: 'en'
});

// Lightweight wrappers around Next.js' navigation APIs
// that will automatically handle localization
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
