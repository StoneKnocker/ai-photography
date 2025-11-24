import { useTranslation } from "react-i18next";
import { languageList, supportedLngs, fallbackLng } from "@/config/i18n";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocation, useNavigate } from "react-router";

export default function LanguageSwitcher({
  trigger,
}: {
  trigger: React.ReactNode;
}) {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLocaleChange = async (newLocale: string) => {
    // 获取当前路径，去除语言前缀
    const currentPathname = location.pathname;
    const pathWithoutLocale =
      currentPathname.replace(/^\/[a-z]{2}(?=\/|$)/, "") || "/";

    // 构建新的路径
    let newPath: string;
    if (newLocale === fallbackLng) {
      // 英语路径不带前缀
      newPath = pathWithoutLocale;
    } else {
      // 其他语言带语言前缀
      newPath = `/${newLocale}${pathWithoutLocale}`;
    }

    // 保持查询参数和hash
    const search = location.search;
    const hash = location.hash;
    const newUrl = `${newPath}${search}${hash}`;

    // 切换语言
    await i18n.changeLanguage(newLocale);

    // 导航到新URL
    navigate(newUrl);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-28">
        {languageList.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLocaleChange(language.code)}
          >
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
