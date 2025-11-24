import type { Resource } from "i18next";

// 从加载的文件中自动推断支持的语言
export const supportedLngs = ["en"];
// 自动加载所有翻译文件
const translationFiles = import.meta.glob("./json/**/*.json", { eager: true });

// 动态构建resources对象
const resources = Object.entries(translationFiles).reduce(
  (acc, [path, module]) => {
    // 从路径中提取语言和命名空间
    // 路径格式: ./json/{lang}/{namespace}.json
    const match = path.match(/\.\/json\/([^/]+)\/([^/]+)\.json$/);
    if (!match) return acc;

    const [, lang, namespace] = match;

    if (!acc[lang]) {
      acc[lang] = {};
    }

    acc[lang]![namespace] = (module as any).default;
    return acc;
  },
  {} as Resource
);

export { resources };
