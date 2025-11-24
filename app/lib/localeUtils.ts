import { fallbackLng } from "~/config/i18n";

/**
 * 根据给定的语言本地化路径
 * @param path 原始路径
 * @param locale 目标语言
 * @returns 本地化后的路径
 */
export function localizePathWithLocale(path: string, locale: string): string {
  // 确保路径以 / 开头
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (locale === fallbackLng) {
    // 英语不带前缀，直接返回原路径
    return normalizedPath;
  } else {
    // 其他语言添加语言前缀
    return `/${locale}${normalizedPath}`;
  }
}

/**
 * 从路径中提取语言代码
 * @param pathname 当前路径
 * @returns 语言代码或 null
 */
export function extractLocaleFromPath(pathname: string): string | null {
  const matches = pathname.match(/^\/([a-z]{2})(?=\/|$)/);
  return matches ? matches[1] : null;
}

/**
 * 移除路径中的语言前缀
 * @param pathname 当前路径
 * @returns 移除语言前缀后的路径
 */
export function removeLocaleFromPath(pathname: string): string {
  return pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "") || "/";
}
