import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n/routing';

export default createMiddleware({
  defaultLocale: 'zh',
  locales,
  localePrefix: 'as-needed'
});

export const config = {
  matcher: [
    // 匹配所有路径，但排除不需要国际化的路径
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};