import { resources, supportedLngs } from "~/locales";

// Re-export for backward compatibility
export { resources, supportedLngs };

// This is the language you want to use in case
// the user language is not in the supportedLngs
export const fallbackLng = "en";

// The default namespace of i18next is "translation", but you can customize it
export const defaultNS = "common";

const languageNames: Record<string, string> = {
  en: "English",
  zh: "中文简体",
  es: "Español",
  ja: "日本語",
  de: "Deutsch",
  fr: "Français",
  ko: "한국어",
  ms: "Bahasa Melayu",
};

export const languageList = (supportedLngs as readonly string[]).map(
  (code) => ({
    code,
    name: languageNames[code] || code.toUpperCase(),
  })
);
