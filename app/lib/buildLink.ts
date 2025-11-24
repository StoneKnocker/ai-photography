import { fallbackLng } from "~/config/i18n";

export const getLinkHref = (locale: string, page: string): string => {
  // 去除 page 前面的 /
  const path = page.startsWith("/") ? page.slice(1) : page;

  if (locale == fallbackLng) {
    return `/${path}`;
  }
  return `/${locale}/${path}`;
};

export function getCanonical(locale: string, page: string): string {
  return new URL(
    getLinkHref(locale, page),
    import.meta.env.VITE_SITE_URL
  ).toString();
}

export function getHreflangs(path: string, localesSupported: string[]): Record<string, string> {
  const languages: Record<string, string> = {};

  // Add x-default
  languages["x-default"] = new URL(
    getLinkHref(fallbackLng, path),
    import.meta.env.VITE_SITE_URL
  ).toString();

  // Add all supported languages
  localesSupported.forEach((locale) => {
    languages[locale] = new URL(
      getLinkHref(locale, path),
      import.meta.env.VITE_SITE_URL
    ).toString();
  });

  return languages;
}
