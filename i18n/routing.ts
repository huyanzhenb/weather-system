import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const locales = ['zh', 'en', 'tw'] as const;
export type Locale = (typeof locales)[number];

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({ locales });

export const routing = {
  locales,
  defaultLocale: 'zh' as const,
  localePrefix: 'as-needed' as const
};