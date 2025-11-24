import { useTranslation } from "react-i18next";

/**
 * 自定义 Hook 用于处理多语言路由链接
 * 根据当前语言自动添加或移除语言前缀
 */
export function useLocalizedLink() {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;

  /**
   * 将路径本地化为当前语言的路径
   * @param path 原始路径
   * @returns 本地化后的路径
   */
  const localizeRoute = (path: string): string => {
    // 确保路径以 / 开头
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;

    if (currentLocale === "en") {
      // 英语不带前缀，直接返回原路径
      return normalizedPath;
    } else {
      // 其他语言添加语言前缀
      return `/${currentLocale}${normalizedPath}`;
    }
  };

  return { localizeRoute, currentLocale };
}
