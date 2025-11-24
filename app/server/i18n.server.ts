import { createCookie } from "react-router";
import { RemixI18Next } from "remix-i18next/server";

import * as i18n from "~/config/i18n";

export const localeCookie = createCookie("lng", {
  path: "/",
  sameSite: "lax",
  secure: import.meta.env.NODE_ENV === "production",
  httpOnly: true,
});

export default new RemixI18Next({
  detection: {
    supportedLanguages: i18n.supportedLngs,
    fallbackLanguage: i18n.fallbackLng,
    cookie: localeCookie,
    async findLocale(request: Request): Promise<string> {
      const url = new URL(request.url);
      let locale = url.pathname.split("/").at(1);

      // 如果路径中没有语言前缀，或者语言前缀不在支持的语言列表中，则使用英语
      if (!locale || !i18n.supportedLngs.includes(locale)) {
        return i18n.fallbackLng;
      }

      return locale;
    },
  },
  // This is the configuration for i18next used
  // when translating messages server-side only
  i18next: {
    ...i18n,
  },
});
